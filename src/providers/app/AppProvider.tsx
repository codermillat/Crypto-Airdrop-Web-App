import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router-dom';
import WalletProvider from '../wallet/WalletProvider';
import ErrorBoundary from '../../components/ErrorBoundary';
import { getManifestUrl } from '../../utils/config/manifest';
import { getTonConnectPreferences } from './config';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const manifestUrl = getManifestUrl();
  const uiPreferences = getTonConnectPreferences();

  return (
    <ErrorBoundary>
      <TonConnectUIProvider 
        manifestUrl={manifestUrl}
        uiPreferences={uiPreferences}
      >
        <WalletProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </WalletProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;