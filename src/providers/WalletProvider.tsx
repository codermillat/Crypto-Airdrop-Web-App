import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useWalletStore } from '../store/useWalletStore';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  isInitialized: boolean;
  error: Error | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  isInitialized: false,
  error: null,
  connect: async () => {},
  disconnect: async () => {}
});

export const useWallet = () => useContext(WalletContext);

interface Props {
  children: ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const { setAddress, resetWalletState } = useWalletStore();

  // Initialize TonConnect
  useEffect(() => {
    let mounted = true;
    let initTimeout: NodeJS.Timeout;

    const initializeWallet = async () => {
      try {
        if (!tonConnectUI) {
          throw new Error('TonConnect UI not available');
        }

        setError(null);
        
        // Wait for TonConnect to be ready
        await new Promise<void>((resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 50;
          const checkInterval = 100;
          
          const checkConnection = () => {
            if (!mounted) return;

            if (tonConnectUI?.connector && typeof tonConnectUI.connector.connected !== 'undefined') {
              resolve();
              return;
            }

            if (attempts >= maxAttempts) {
              reject(new Error('Wallet initialization timeout'));
              return;
            }

            attempts++;
            initTimeout = setTimeout(checkConnection, checkInterval);
          };
          
          checkConnection();
        });

        if (mounted) {
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Wallet initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize wallet'));
          setIsInitialized(false);
        }
      }
    };

    initializeWallet();

    return () => {
      mounted = false;
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
    };
  }, [tonConnectUI]);

  // Handle address changes
  useEffect(() => {
    if (isInitialized && tonConnectUI?.connector) {
      if (userAddress) {
        setAddress(userAddress);
        localStorage.setItem('wallet_address', userAddress);
      } else {
        resetWalletState();
        localStorage.removeItem('wallet_address');
      }
    }
  }, [isInitialized, userAddress, setAddress, resetWalletState, tonConnectUI]);

  const connect = useCallback(async () => {
    if (!tonConnectUI?.connector || !isInitialized) {
      throw new Error('Wallet not initialized');
    }
    
    try {
      setError(null);
      await tonConnectUI.connectWallet();
    } catch (err) {
      console.error('Wallet connection error:', err);
      const error = err instanceof Error ? err : new Error('Failed to connect wallet');
      setError(error);
      throw error;
    }
  }, [tonConnectUI, isInitialized]);

  const disconnect = useCallback(async () => {
    if (!tonConnectUI?.connector || !isInitialized) {
      throw new Error('Wallet not initialized');
    }
    
    try {
      setError(null);
      await tonConnectUI.disconnect();
      resetWalletState();
      localStorage.removeItem('wallet_address');
    } catch (err) {
      console.error('Wallet disconnection error:', err);
      const error = err instanceof Error ? err : new Error('Failed to disconnect wallet');
      setError(error);
      throw error;
    }
  }, [tonConnectUI, isInitialized, resetWalletState]);

  const value = {
    isConnected: isInitialized && !!tonConnectUI?.connector?.connected && !!userAddress,
    address: userAddress || null,
    isInitialized,
    error,
    connect,
    disconnect
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;