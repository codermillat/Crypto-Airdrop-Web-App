import { debugLog } from '../debug';
import { WebAppError } from './errors';

export const setupWebAppMenu = async (botToken: string, url: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/setChatMenuButton`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu_button: {
            type: 'web_app',
            text: 'Open App',
            web_app: { url }
          }
        }),
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      throw new WebAppError(`Failed to set menu button: ${data.description}`);
    }

    debugLog('WebApp menu button set successfully');
  } catch (error) {
    debugLog('Error setting up WebApp menu:', error);
    throw error;
  }
};