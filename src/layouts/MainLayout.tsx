import React from 'react';
import Navigation from '../components/Navigation';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen bg-black text-white">
    <div className="max-w-lg mx-auto pb-20">
      {children}
      <Navigation />
    </div>
  </div>
);

export default MainLayout;