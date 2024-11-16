import { useCallback, useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { fetchUser, registerWallet } from '../utils/api';
import { useWallet } from '../providers/WalletProvider';

export const useTonConnect = () => {
  const { isConnected, address, isInitialized, connect, disconnect } = useWallet();
  const { setAddress, setPoints, setUsername, setIsRegistered, setReferralCode } = useWalletStore();

  const handleConnection = useCallback(async () => {
    if (!isInitialized || !isConnected || !address) {
      return;
    }

    try {
      setAddress(address);
      const walletData = await registerWallet(address);
      
      if (!walletData || !walletData.address) {
        throw new Error('Invalid wallet data received');
      }

      const userData = await fetchUser();
      if (!userData) {
        throw new Error('Failed to fetch user data');
      }

      setPoints(userData.points || 0);
      setUsername(userData.username);
      setIsRegistered(!!userData.username);
      setReferralCode(userData.referralCode);
    } catch (error) {
      console.error('Failed to handle wallet connection:', error);
      setAddress(null);
      setPoints(0);
      setUsername(null);
      setIsRegistered(false);
      setReferralCode(null);
      localStorage.removeItem('wallet_address');
    }
  }, [isInitialized, isConnected, address, setAddress, setPoints, setUsername, setIsRegistered, setReferralCode]);

  useEffect(() => {
    handleConnection();
  }, [handleConnection]);

  return {
    connected: isConnected && !!address,
    address,
    isInitialized,
    connect,
    disconnect
  };
};

export default useTonConnect;