import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { fetchUser } from '../utils/api';

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const { 
    setAddress, 
    setPoints, 
    setUsername, 
    setIsRegistered,
    setReferralCode 
  } = useWalletStore();

  useEffect(() => {
    const handleConnection = async () => {
      if (userAddress) {
        try {
          setAddress(userAddress);
          const userData = await fetchUser();
          setPoints(userData.points || 0);
          setUsername(userData.username);
          setIsRegistered(userData.isRegistered);
          setReferralCode(userData.referralCode);
        } catch (error) {
          console.error('Failed to handle wallet connection:', error);
          // Reset state on error
          setAddress(null);
          setPoints(0);
          setUsername(null);
          setIsRegistered(false);
          setReferralCode(null);
        }
      } else {
        // Reset state on disconnect
        setAddress(null);
        setPoints(0);
        setUsername(null);
        setIsRegistered(false);
        setReferralCode(null);
      }
    };

    handleConnection();
  }, [userAddress]);

  return {
    connected: !!userAddress,
    address: userAddress,
    disconnect: () => tonConnectUI.disconnect()
  };
};

export default useTonConnect;