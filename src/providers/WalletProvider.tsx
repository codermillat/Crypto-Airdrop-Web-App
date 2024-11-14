import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useWalletStore } from '../store/useWalletStore';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  isInitialized: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  isInitialized: false,
});

export const useWallet = () => useContext(WalletContext);

interface Props {
  children: ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();

  useEffect(() => {
    const checkInitialization = () => {
      if (tonConnectUI) {
        setIsInitialized(true);
      }
    };

    // Check immediately
    checkInitialization();

    // Also set up an interval to check until initialized
    const interval = setInterval(checkInitialization, 100);

    // Clear interval once initialized
    return () => clearInterval(interval);
  }, [tonConnectUI]);

  const value = {
    isConnected: isInitialized && !!tonConnectUI?.connected && !!userAddress,
    address: userAddress || null,
    isInitialized,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;