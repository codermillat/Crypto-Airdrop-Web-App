import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import ErrorBoundary from './components/ErrorBoundary';
import WalletProvider from './providers/WalletProvider';

const App: React.FC = () => {
  // Configure TON Connect options
  const manifestUrl = 'https://crypto-airdrop-paws.netlify.app/tonconnect-manifest.json';
  const uiPreferences = {
    uiPreferences: {
      theme: 'DARK',
      colorsSet: {
        connectButton: {
          background: '#3B82F6',
          foreground: '#FFFFFF',
        },
      },
    },
    actionsConfiguration: {
      twaReturnUrl: 'https://crypto-airdrop-paws.netlify.app/',
    },
  };

  return (
    <ErrorBoundary>
      <TonConnectUIProvider manifestUrl={manifestUrl} {...uiPreferences}>
        <WalletProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-black text-white">
              <div className="max-w-lg mx-auto pb-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/earn" element={<Earn />} />
                </Routes>
                <Navigation />
              </div>
            </div>
          </BrowserRouter>
        </WalletProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
};

export default App;