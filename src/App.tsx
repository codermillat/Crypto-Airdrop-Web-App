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

const App: React.FC = () => {
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const manifestUrl = `${appUrl}/tonconnect-manifest.json`;

  return (
    <ErrorBoundary>
      <TonConnectUIProvider 
        manifestUrl={manifestUrl}
        uiPreferences={{
          theme: 'SYSTEM'
        }}
        actionsConfiguration={{
          twaReturnUrl: appUrl
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
    </ErrorBoundary>
  );
};

export default App;