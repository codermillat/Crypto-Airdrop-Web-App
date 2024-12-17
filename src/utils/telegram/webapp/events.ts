import { debugLog } from '../debug';

type EventCallback = () => void;

interface WebAppEvents {
  viewportChanged: EventCallback[];
  themeChanged: EventCallback[];
  mainButtonClicked: EventCallback[];
  backButtonClicked: EventCallback[];
}

const events: WebAppEvents = {
  viewportChanged: [],
  themeChanged: [],
  mainButtonClicked: [],
  backButtonClicked: []
};

export const setupWebAppEvents = (webApp: any): void => {
  try {
    debugLog('Setting up WebApp events');

    // Viewport events
    webApp.onEvent('viewportChanged', () => {
      debugLog('Viewport changed:', {
        height: webApp.viewportHeight,
        isExpanded: webApp.isExpanded
      });
      events.viewportChanged.forEach(callback => callback());
    });

    // Theme events
    webApp.onEvent('themeChanged', () => {
      debugLog('Theme changed:', {
        colorScheme: webApp.colorScheme,
        themeParams: webApp.themeParams
      });
      events.themeChanged.forEach(callback => callback());
    });

    debugLog('WebApp events setup completed');
  } catch (error) {
    debugLog('Error setting up WebApp events:', error);
  }
};

export const addEventListener = (
  event: keyof WebAppEvents, 
  callback: EventCallback
): void => {
  events[event].push(callback);
};

export const removeEventListener = (
  event: keyof WebAppEvents, 
  callback: EventCallback
): void => {
  events[event] = events[event].filter(cb => cb !== callback);
};