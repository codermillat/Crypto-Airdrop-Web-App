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

interface WalletData {
  address: string | null;
  points?: number;
  username?: string;
  referralCode?: string;
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

  const registerOrFetchWallet = async (address: string | null, retryCount = 3): Promise<WalletData | null> => {
    if (!address) {
      return null;
    }
    try {
      const userData: WalletData = await registerWallet(address);

      if (!userData || !userData.address) {
        throw new Error('Invalid wallet data received');
      }

      setPoints(userData.points || 0);
      setUsername(userData.username || null);
      setIsRegistered(!!userData.username);
      setReferralCode(userData.referralCode || null);
      
      return userData;
    } catch (err: any) {
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return registerOrFetchWallet(address, retryCount - 1);
      }
      console.error("Error in registerOrFetchWallet:", err);
      throw new Error(`Failed to register or fetch wallet: ${err.message}`);
    }
  };

  useEffect(() => {
    let mounted = true;
    let initTimeout: NodeJS.Timeout;

    const initializeWallet = async () => {
      try {
        if (!tonConnectUI) {
          throw new Error('TON Connect UI not available');
        }
        
        setError(null);

        // Add timeout to prevent infinite waiting
        const timeoutPromise = new Promise((_, reject) => {
          initTimeout = setTimeout(() => {
            reject(new Error('Wallet initialization timed out'));
          }, 10000);
        });

        // Race between connection restoration and timeout
        await Promise.race([
          tonConnectUI.connectionRestored,
          timeoutPromise
        ]).catch(err => {
          // Handle timeout or connection error gracefully
          console.warn('Connection restoration warning:', err);
        });
        
        clearTimeout(initTimeout);
        
        if (mounted) {
          setIsInitialized(true);
        }
      } catch (err: any) {
        if (mounted) {
          console.error('Wallet initialization error:', err);
          setError(err instanceof Error ? err : new Error('Failed to initialize wallet'));
          // Still set initialized to true to prevent hanging
          setIsInitialized(true);
        }
      }
    };

    initializeWallet();

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
    };
  }, [tonConnectUI]);

  useEffect(() => {
    const handleAddressChange = async () => {
      if (!isInitialized) return;

      if (userAddress) {
        try {
          setAddress(userAddress);
          localStorage.setItem('wallet_address', userAddress);
          await registerOrFetchWallet(userAddress);
          setError(null);
        } catch (error: any) {
          console.error('Failed to handle address change:', error);
          setError(new Error(`Failed to connect wallet: ${error.message}`));
          resetWalletState();
          localStorage.removeItem('wallet_address');
        }
      } else {
        resetWalletState();
        localStorage.removeItem('wallet_address');
      }
    };

    handleAddressChange();
  }, [isInitialized, userAddress, setAddress, resetWalletState]);

  const connect = useCallback(async () => {
    if (!tonConnectUI) {
      throw new Error('TON Connect UI not available. Please install TON Wallet.');
    }
    
    if (!isInitialized) {
      throw new Error('Wallet not initialized. Please refresh the page.');
    }
    
    try {
      setError(null);
      await tonConnectUI.connectWallet();
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error('Failed to connect wallet');
      console.error('Wallet connection error:', error);
      setError(error);
      throw error;
    }
  }, [tonConnectUI, isInitialized]);

  const disconnect = useCallback(async () => {
    if (!tonConnectUI) {
      throw new Error('TON Connect UI not available');
    }
    
    if (!isInitialized) {
      throw new Error('Wallet not initialized');
    }
    
    try {
      setError(null);
      await tonConnectUI.disconnect();
      resetWalletState();
      localStorage.removeItem('wallet_address');
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error('Failed to disconnect wallet');
      console.error('Wallet disconnection error:', error);
      setError(error);
      throw error;
    }
  }, [tonConnectUI, isInitialized, resetWalletState]);

  // Provide a more detailed connection status
  const isConnected = isInitialized && 
    !!tonConnectUI?.connector?.connected && 
    !!userAddress && 
    !error;

  const value = {
    isConnected,
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