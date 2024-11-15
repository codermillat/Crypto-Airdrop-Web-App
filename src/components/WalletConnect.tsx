import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useWallet } from '../providers/WalletProvider';
import { Loader2, AlertCircle } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

const WalletConnectInner = () => {
  const { isConnected, isInitialized, error } = useWallet();

  if (error) {
    return (
      <div className="flex items-center justify-center space-x-2 text-red-500 p-2">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">Connection error</span>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex justify-center p-2">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <TonConnectButton 
        className={`${isConnected ? 'connected' : ''} !bg-blue-500 hover:!bg-blue-600`}
      />
    </div>
  );
};

const WalletConnect = () => (
  <ErrorBoundary
    fallback={
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
      >
        Reconnect Wallet
      </button>
    }
  >
    <WalletConnectInner />
  </ErrorBoundary>
);

export default WalletConnect;