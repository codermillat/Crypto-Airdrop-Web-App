import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
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
  const userAddress = useTonAddress(false);
  const { 
    setAddress, 
    setPoints, 
    setUsername, 
    setIsRegistered, 
    setReferralCode, 
    resetWalletState 
  } = useWalletStore();

  const handleConnect = useCallback(async () => {
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

  const handleDisconnect = useCallback(async () => {
    if (!tonConnectUI) {
      throw new Error('TON Connect UI not available');
    }
    
    try {
      setError(null);
      await tonConnectUI.disconnect();
      resetWalletState();
      localStorage.removeItem('wallet_address');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to disconnect wallet');
      setError(error);
      throw error;
    }
  }, [tonConnectUI, resetWalletState]);

  useEffect(() => {
    const initializeWallet = async () => {
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

    initializeWallet();
  }, [tonConnectUI]);

  useEffect(() => {
    const handleAddressChange = async () => {
      if (!isInitialized) return;

      if (userAddress) {
        try {
          setAddress(userAddress);
          localStorage.setItem('wallet_address', userAddress);
          const userData = await registerWallet(userAddress);
          
          if (userData) {
            setPoints(userData.points || 0);
            setUsername(userData.username || null);
            setIsRegistered(!!userData.username);
            setReferralCode(userData.referralCode || null);
          }
          
          setError(null);
        } catch (err) {
          console.error('Failed to handle address change:', err);
          setError(err instanceof Error ? err : new Error('Failed to connect wallet'));
          resetWalletState();
          localStorage.removeItem('wallet_address');
        }
      } else {
        resetWalletState();
        localStorage.removeItem('wallet_address');
      }
    };

    handleAddressChange();
  }, [isInitialized, userAddress, setAddress, setPoints, setUsername, setIsRegistered, setReferralCode, resetWalletState]);

  const isConnected = isInitialized && 
    !!tonConnectUI?.connector?.connected && 
    !!userAddress && 
    !error;

  const value = {
    isConnected,
    address: userAddress || null,
    isInitialized,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;