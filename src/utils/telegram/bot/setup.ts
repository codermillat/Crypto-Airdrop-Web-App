import { debugLog } from '../debug';
import { COMMANDS } from './commands';
import { getTelegramConfig } from '../../config';

export const setupBot = async (): Promise<void> => {
  try {
    const { botToken } = getTelegramConfig();
    
    // Set bot commands
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/setMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commands: COMMANDS }),
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Failed to set bot commands: ${data.description}`);
    }

    debugLog('Bot commands set successfully');
  } catch (error) {
    debugLog('Error setting up bot:', error);
    throw error;
  }
};