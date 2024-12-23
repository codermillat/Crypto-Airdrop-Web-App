import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';
import Leaderboard from '../pages/Leaderboard';
import Friends from '../pages/Friends';
import Earn from '../pages/Earn';
import Admin from '../pages/Admin';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/leaderboard', element: <Leaderboard /> },
  { path: '/friends', element: <Friends /> },
  { path: '/earn', element: <Earn /> },
  { path: '/admin', element: <Admin /> }
];

export const AppRoutes: React.FC = () => (
  <>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </>
);