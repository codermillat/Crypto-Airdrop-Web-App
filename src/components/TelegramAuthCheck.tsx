import React from 'react';
import { useWallet } from '../providers/WalletProvider';

const TelegramAuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Allow all access by directly rendering children
  return <>{children}</>;
};

export default TelegramAuthCheck;