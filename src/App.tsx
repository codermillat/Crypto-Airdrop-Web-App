import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './providers/app/AppProvider';
import TelegramAuthCheck from './components/TelegramAuthCheck';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import Admin from './pages/Admin';

const App: React.FC = () => (
  <AppProvider>
    <TelegramAuthCheck>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </TelegramAuthCheck>
  </AppProvider>
);

export default App;