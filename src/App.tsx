import React from 'react';
import { 
  Routes, 
  Route, 
  createRoutesFromElements, 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import AppProvider from './providers/app/AppProvider';
import TelegramAuthCheck from './components/TelegramAuthCheck';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import Admin from './pages/Admin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/earn" element={<Earn />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

const App: React.FC = () => (
  <AppProvider>
    <TelegramAuthCheck>
      <RouterProvider router={router} />
    </TelegramAuthCheck>
  </AppProvider>
);

export default App;