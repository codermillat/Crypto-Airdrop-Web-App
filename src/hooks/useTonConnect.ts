import { useCallback, useEffect } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useWalletStore } from '../store/useWalletStore';
import { fetchUser } from '../utils/api';
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
      const userData = await fetchUser();
      setPoints(userData.points || 0);
      setUsername(userData.username);
      setIsRegistered(userData.isRegistered);
      setReferralCode(userData.referralCode);
    } catch (error) {
      console.error('Failed to handle wallet connection:', error);
    }
  }, [isInitialized, isConnected, address, setAddress, setPoints, setUsername, setIsRegistered, setReferralCode]);

  useEffect(() => {
    handleConnection();
  }, [handleConnection]);

  return {
    connected: isConnected,
    address,
    isInitialized,
    connect,
    disconnect
  };
};

export default useTonConnect;