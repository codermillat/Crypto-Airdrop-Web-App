import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useWallet } from '../providers/WalletProvider';
import { Loader2 } from 'lucide-react';

const WalletConnect = () => {
  const { isConnected, isInitialized } = useWallet();

  if (!isInitialized) {
    return (
      <div className="flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <TonConnectButton 
        className={isConnected ? 'connected' : ''}
      />
    </div>
  );
};

export default WalletConnect;