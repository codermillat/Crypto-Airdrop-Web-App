import { useState, useEffect } from 'react';
import { TelegramUser, TelegramWebApp } from '../../types/telegram';
import { getWebApp } from './webapp';
import { validateTelegramUser } from './validation';

interface WebAppTheme {
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
}

interface WebAppViewport {
  height: number;
  stableHeight: number;
  isExpanded: boolean;
}

export const useWebAppUser = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const webApp = getWebApp();
      const userData = webApp?.initDataUnsafe?.user;

      if (!validateTelegramUser(userData)) {
        throw new Error('Invalid or missing user data');
      }

      setUser(userData || null);
      setError(null);
    } catch (err) {
      console.error('Error getting WebApp user:', err);
      setUser(null);
      setError(err instanceof Error ? err : new Error('Failed to get user data'));
    }
  }, []);

  return { user, error };
};

export const useWebAppTheme = () => {
  const [theme, setTheme] = useState<WebAppTheme>({
    colorScheme: 'dark',
    themeParams: {}
  });

  useEffect(() => {
    const webApp = getWebApp();
    if (!webApp) return;

    const updateTheme = () => {
      setTheme({
        colorScheme: webApp.colorScheme || 'dark',
        themeParams: webApp.themeParams || {}
      });
    };

    updateTheme();
    // Add event listeners if available
    // Example: webApp.onThemeChanged(updateTheme);
  }, []);

  return theme;
};

export const useWebAppViewport = () => {
  const [viewport, setViewport] = useState<WebAppViewport>({
    height: window.innerHeight,
    stableHeight: window.innerHeight,
    isExpanded: false
  });

  useEffect(() => {
    const webApp = getWebApp();
    if (!webApp) return;

    const updateViewport = () => {
      setViewport({
        height: webApp.viewportHeight || window.innerHeight,
        stableHeight: webApp.viewportStableHeight || window.innerHeight,
        isExpanded: webApp.isExpanded || false
      });
    };

    updateViewport();
    // Add event listeners if available
    // Example: webApp.onViewportChanged(updateViewport);
  }, []);

  return viewport;
};

export const useMainButton = (text: string, onClick: () => void) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const webApp = getWebApp();
    if (!webApp?.MainButton) return;

    const button = webApp.MainButton;
    button.setText(text);
    button.onClick(onClick);
    
    return () => {
      button.offClick(onClick);
    };
  }, [text, onClick]);

  const show = () => {
    const webApp = getWebApp();
    if (!webApp?.MainButton) return;

    webApp.MainButton.show();
    setIsVisible(true);
  };

  const hide = () => {
    const webApp = getWebApp();
    if (!webApp?.MainButton) return;

    webApp.MainButton.hide();
    setIsVisible(false);
  };

  const setLoading = (loading: boolean) => {
    const webApp = getWebApp();
    if (!webApp?.MainButton) return;

    if (loading) {
      webApp.MainButton.showProgress();
    } else {
      webApp.MainButton.hideProgress();
    }
    setIsLoading(loading);
  };

  return {
    isVisible,
    isLoading,
    show,
    hide,
    setLoading
  };
};

export const useBackButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const webApp = getWebApp();
    if (!webApp?.BackButton) return;

    webApp.BackButton.hide();
  }, []);

  const show = () => {
    const webApp = getWebApp();
    if (!webApp?.BackButton) return;

    webApp.BackButton.show();
    setIsVisible(true);
  };

  const hide = () => {
    const webApp = getWebApp();
    if (!webApp?.BackButton) return;

    webApp.BackButton.hide();
    setIsVisible(false);
  };

  const onClick = (callback: () => void) => {
    const webApp = getWebApp();
    if (!webApp?.BackButton) return;

    webApp.BackButton.onClick(callback as () => void);
    return () => webApp.BackButton.offClick(callback);
  };

  return {
    isVisible,
    show,
    hide,
    onClick
  };
};
