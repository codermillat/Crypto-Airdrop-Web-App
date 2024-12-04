import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useWallet } from '../providers/WalletProvider';
import { Loader2, AlertCircle } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

const WalletConnectInner = () => {
  const { isConnected, isInitialized, error } = useWallet();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 p-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
        <p className="text-sm text-red-500 text-center">{error.message}</p>
        {error.message.includes('install') && (
          <a
            href="https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Install TON Wallet
          </a>
        )}
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