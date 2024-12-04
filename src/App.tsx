import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';
import WalletProvider from './providers/WalletProvider';
import TelegramAppCheck from './components/telegram/TelegramAppCheck';
import SyncCheck from './components/SyncCheck';
import { getManifestUrl } from './utils/config';

const App: React.FC = () => {
  const manifestUrl = getManifestUrl();

  return (
    <ErrorBoundary>
      <SyncCheck>
        <TelegramAppCheck>
          <TonConnectUIProvider 
            manifestUrl={manifestUrl}
            uiPreferences={{
              theme: 'SYSTEM',
              colorsSet: {
                connectButton: {
                  background: '#3B82F6',
                  foreground: '#FFFFFF'
                }
              } as Record<string, any>
            }}
            actionsConfiguration={{
              twaReturnUrl: window.location.origin,
              skipRedirectToWallet: undefined
            }}
          >
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
                      <Route path="/admin" element={<Admin />} />
                    </Routes>
                    <Navigation />
                  </div>
                </div>
              </BrowserRouter>
            </WalletProvider>
          </TonConnectUIProvider>
        </TelegramAppCheck>
      </SyncCheck>
    </ErrorBoundary>
  );
};

export default App;