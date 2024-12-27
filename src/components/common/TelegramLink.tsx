import React from 'react';
import { getConfig } from '../../utils/config';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const TelegramLink: React.FC<Props> = ({ className, children }) => {
  const { botUsername } = getConfig();
  const telegramUrl = `https://t.me/${botUsername}`;

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || 'Open in Telegram'}
    </a>
  );
};

export default TelegramLink;