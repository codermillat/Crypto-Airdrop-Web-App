import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useWalletStore } from '../store/useWalletStore';
import { registerWallet } from '../utils/api';

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
  const { 
    setAddress, 
    setPoints, 
    setUsername, 
    setIsRegistered, 
    setReferralCode, 
    resetWalletState 
  } = useWalletStore();

  const registerOrFetchWallet = async (address: string, retryCount = 3): Promise<any> => {
    try {
      const userData = await registerWallet(address);
      
      if (!userData || !userData.address) {
        throw new Error('Invalid wallet data received');
      }

      setPoints(userData.points || 0);
      setUsername(userData.username);
      setIsRegistered(!!userData.username);
      setReferralCode(userData.referralCode);
      
      return userData;
    } catch (err) {
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return registerOrFetchWallet(address, retryCount - 1);
      }
      throw err;
    }
  };

  useEffect(() => {
    let mounted = true;
    let initTimeout: NodeJS.Timeout;

    const initializeWallet = async () => {
      try {
        if (!tonConnectUI) {
          throw new Error('TonConnect UI not available');
        }

        setError(null);
        
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
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to initialize wallet');
          console.error('Wallet initialization error:', error);
          setError(error);
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

  useEffect(() => {
    const handleAddressChange = async () => {
      if (!isInitialized || !tonConnectUI?.connector) return;

      if (userAddress) {
        try {
          setAddress(userAddress);
          localStorage.setItem('wallet_address', userAddress);
          await registerOrFetchWallet(userAddress);
          setError(null);
        } catch (error) {
          console.error('Failed to handle address change:', error);
          setError(new Error('Failed to connect wallet. Please try again.'));
          resetWalletState();
          localStorage.removeItem('wallet_address');
        }
      } else {
        resetWalletState();
        localStorage.removeItem('wallet_address');
      }
    };

    handleAddressChange();
  }, [isInitialized, userAddress, tonConnectUI, setAddress, resetWalletState]);

  const connect = useCallback(async () => {
    if (!tonConnectUI?.connector || !isInitialized) {
      throw new Error('Wallet not initialized');
    }
    
    try {
      setError(null);
      await tonConnectUI.connectWallet();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to connect wallet');
      console.error('Wallet connection error:', error);
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
      const error = err instanceof Error ? err : new Error('Failed to disconnect wallet');
      console.error('Wallet disconnection error:', error);
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