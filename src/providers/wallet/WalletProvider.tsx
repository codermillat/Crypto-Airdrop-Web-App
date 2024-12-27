import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useTonAddress, useTonConnectUI, THEME } from '@tonconnect/ui-react';
import { useWalletStore } from '../../store/useWalletStore';
import { registerWallet } from '../../utils/api';

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
  children: React.ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const { setAddress, resetWalletState } = useWalletStore();

  useEffect(() => {
    const initWallet = async () => {
      try {
        await tonConnectUI?.connectionRestored;
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Wallet initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize wallet'));
        setIsInitialized(true);
      }
    };

    initWallet();
  }, [tonConnectUI]);

  const connect = useCallback(async () => {
    if (!tonConnectUI) {
      throw new Error('TON Connect UI not available');
    }
    
    try {
      setError(null);
      await tonConnectUI.connectWallet();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to connect wallet');
      setError(error);
      throw error;
    }
  }, [tonConnectUI]);

  const disconnect = useCallback(async () => {
    if (!tonConnectUI) {
      throw new Error('TON Connect UI not available');
    }
    
    try {
      setError(null);
      await tonConnectUI.disconnect();
      resetWalletState();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to disconnect wallet');
      setError(error);
      throw error;
    }
  }, [tonConnectUI, resetWalletState]);

  useEffect(() => {
    if (userAddress) {
      setAddress(userAddress);
    } else {
      resetWalletState();
    }
  }, [userAddress, setAddress, resetWalletState]);

  const value = {
    isConnected: isInitialized && !!userAddress && !error,
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