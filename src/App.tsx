import React from 'react';
import { 
  Routes, 
  Route, 
  createRoutesFromElements, 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import AppProvider from './providers/app/AppProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import Admin from './pages/Admin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout><Outlet /></MainLayout>}>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/earn" element={<Earn />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
  )
);

const App: React.FC = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);

export default App;