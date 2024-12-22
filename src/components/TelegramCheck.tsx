import React from 'react';
import { isTelegramWebApp } from '../utils/telegram/detection';
import { initializeTelegramWebApp } from '../utils/telegram/initialization';
import TelegramRedirect from './telegram/TelegramRedirect';

interface Props {
  children: React.ReactNode;
}

const TelegramCheck: React.FC<Props> = ({ children }) => {
  React.useEffect(() => {
    initializeTelegramWebApp();
  }, []);

  // In development, always render children
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  // In production, check for Telegram environment
  if (!isTelegramWebApp()) {
    return <TelegramRedirect />;
  }

  return <>{children}</>;
};

export default TelegramCheck;