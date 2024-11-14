import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useCallback } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { fetchUser } from '../utils/api';
import { useWallet } from '../providers/WalletProvider';

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { isConnected, address, isInitialized } = useWallet();
  const { 
    setAddress, 
    setPoints, 
    setUsername, 
    setIsRegistered,
    setReferralCode 
  } = useWalletStore();

  const resetWalletState = useCallback(() => {
    setAddress(null);
    setPoints(0);
    setUsername(null);
    setIsRegistered(false);
    setReferralCode(null);
  }, [setAddress, setPoints, setUsername, setIsRegistered, setReferralCode]);

  const handleConnection = useCallback(async () => {
    if (!isInitialized || !isConnected || !address) {
      resetWalletState();
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
      resetWalletState();
    }
  }, [isInitialized, isConnected, address, resetWalletState, setAddress, setPoints, setUsername, setIsRegistered, setReferralCode]);

  useEffect(() => {
    if (isInitialized) {
      handleConnection();
    }
  }, [isInitialized, handleConnection]);

  const disconnect = useCallback(async () => {
    if (!tonConnectUI) return;
    
    try {
      await tonConnectUI.disconnect();
      resetWalletState();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [tonConnectUI, resetWalletState]);

  return {
    connected: isConnected,
    address,
    isInitialized,
    disconnect
  };
};

export default useTonConnect;