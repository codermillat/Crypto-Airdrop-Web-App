import React from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { useWalletStore } from '../../store/useWalletStore';
import { WalletContext } from './context';
import { useWalletInitialization, useWalletConnection } from './hooks';

interface Props {
  children: React.ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const { isInitialized, error, connector } = useWalletInitialization();
  const { connect, disconnect } = useWalletConnection(connector);
  const userAddress = useTonAddress(false);
  const { setAddress, resetWalletState } = useWalletStore();

  React.useEffect(() => {
    if (isInitialized && userAddress) {
      setAddress(userAddress);
      localStorage.setItem('wallet_address', userAddress);
    } else if (isInitialized) {
      resetWalletState();
      localStorage.removeItem('wallet_address');
    }
  }, [isInitialized, userAddress, setAddress, resetWalletState]);

  const value = {
    isConnected: isInitialized && 
                 !!connector?.connector?.connected && 
                 !!userAddress && 
                 !error,
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