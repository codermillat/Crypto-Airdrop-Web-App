import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, Vote, Users, Wallet } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaders' },
    { path: '/tasks', icon: Vote, label: 'Tasks' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/earn', icon: Wallet, label: 'Earn' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-between items-center">
          {navItems.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-3 px-4 ${
                location.pathname === path ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;