import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { getUIPreferences } from '../../config/ton/ui';
import { getWalletsConfig } from '../../config/ton/wallets';
import { getManifestUrl } from '../../config/ton/manifest';
import { CONNECTION_CONFIG } from '../../config/ton/constants';
import ErrorBoundary from '../../components/ErrorBoundary';

interface Props {
  children: React.ReactNode;
}

const TonProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <TonConnectUIProvider
        manifestUrl={getManifestUrl()}
        uiPreferences={getUIPreferences()}
        walletsListConfiguration={getWalletsConfig()}
        connectOnMount={CONNECTION_CONFIG.connectOnMount}
      >
        {children}
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
};

export default TonProvider;