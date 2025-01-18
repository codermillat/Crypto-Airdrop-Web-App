import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TonProvider from '../ton/TonProvider';
import WalletProvider from '../wallet/WalletProvider';
import ErrorBoundary from '../../components/ErrorBoundary';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <TonProvider>
        <WalletProvider>
          {children}
        </WalletProvider>
      </TonProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;