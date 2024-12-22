import React from 'react';
import { getTelegramConfig } from '../../utils/config';

const TelegramRedirect: React.FC = () => {
  const { botUsername } = getTelegramConfig();
  const telegramUrl = `https://t.me/${botUsername}`;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Please open in Telegram</h1>
        <a
          href={telegramUrl}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Open in Telegram
        </a>
      </div>
    </div>
  );
};

export default TelegramRedirect;