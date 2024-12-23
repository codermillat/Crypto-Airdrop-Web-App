import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useWalletStore } from '../../store/useWalletStore';
import { WalletContext } from './context';
import { initializeWalletConnection, registerOrFetchWallet, isTonConnectUIReady } from './utils';
import type { WalletState } from './types';

interface Props {
  children: ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    isInitialized: false,
    error: null
  });
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress(false);
  const { 
    setAddress, 
    setPoints, 
    setUsername, 
    setIsRegistered, 
    setReferralCode, 
    resetWalletState 
  } = useWalletStore();

  useEffect(() => {
    let mounted = true;
    let initTimeout: NodeJS.Timeout;

    const initialize = async () => {
      try {
        // Set initialization timeout
        initTimeout = setTimeout(() => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              error: new Error('Wallet initialization timed out')
            }));
          }
        }, 10000);

        await initializeWalletConnection(tonConnectUI);
        
        if (mounted) {
          setState(prev => ({ ...prev, isInitialized: true, error: null }));
        }
      } catch (err: any) {
        if (mounted) {
          console.error('Wallet initialization error:', err);
          setState(prev => ({
            ...prev,
            isInitialized: true,
            error: err instanceof Error ? err : new Error('Failed to initialize wallet')
          }));
        }
      } finally {
        clearTimeout(initTimeout);
      }
    };

    initialize();
    return () => { 
      mounted = false;
      clearTimeout(initTimeout);
    };
  }, [tonConnectUI]);

  // Rest of the component remains the same...

  const isConnected = state.isInitialized && 
    isTonConnectUIReady(tonConnectUI) &&
    !!userAddress && 
    !state.error;

  return (
    <WalletContext.Provider value={{
      isConnected,
      address: userAddress || null,
      isInitialized: state.isInitialized,
      error: state.error,
      connect,
      disconnect
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;