import React from 'react';
import { useWallet } from '../providers/WalletProvider';

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Allow all access by directly rendering children
  return <>{children}</>;
};

export default TelegramCheck;