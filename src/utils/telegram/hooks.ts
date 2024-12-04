import { useState, useEffect, useCallback } from 'react';
import { getWebAppData } from './webapp';
import { TelegramSecurityError } from './security';

export const useWebAppUser = () => {
  const [user, setUser] = useState(window.Telegram?.WebApp?.initDataUnsafe?.user || null);
  const [error, setError] = useState<TelegramSecurityError | null>(null);

  useEffect(() => {
    try {
      const webAppData = getWebAppData();
      if (webAppData?.user) {
        setUser(webAppData.user);
        setError(null);
      }
    } catch (err) {
      if (err instanceof TelegramSecurityError) {
        setError(err);
      }
      setUser(null);
    }
  }, []);

  return { user, error };
};

export const useWebAppTheme = () => {
  const [theme, setTheme] = useState({
    colorScheme: window.Telegram?.WebApp?.colorScheme || 'dark',
    themeParams: window.Telegram?.WebApp?.themeParams || {}
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme({
        colorScheme: window.Telegram?.WebApp?.colorScheme || 'dark',
        themeParams: window.Telegram?.WebApp?.themeParams || {}
      });
    };

    const webApp = window.Telegram?.WebApp;
    if (webApp && webApp.onEvent) {
      webApp.onEvent('themeChanged', handleThemeChange);
      return () => webApp.offEvent('themeChanged', handleThemeChange);
    }
  }, []);

  return theme;
};

export const useWebAppViewport = () => {
  const [viewport, setViewport] = useState({
    height: window.Telegram?.WebApp?.viewportHeight || 0,
    stableHeight: window.Telegram?.WebApp?.viewportStableHeight || 0,
    isExpanded: window.Telegram?.WebApp?.isExpanded || false
  });

  useEffect(() => {
    const handleViewportChange = () => {
      setViewport({
        height: window.Telegram?.WebApp?.viewportHeight || 0,
        stableHeight: window.Telegram?.WebApp?.viewportStableHeight || 0,
        isExpanded: window.Telegram?.WebApp?.isExpanded || false
      });
    };

    const webApp = window.Telegram?.WebApp;
    if (webApp && webApp.onEvent) {
      webApp.onEvent('viewportChanged', handleViewportChange);
      return () => webApp.offEvent('viewportChanged', handleViewportChange);
    }
  }, []);

  return viewport;
};

export const useMainButton = (text: string, onClick: () => void) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const show = useCallback(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button && button.show) {
      button.show();
      setIsVisible(true);
    }
  }, []);

  const hide = useCallback(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button && button.hide) {
      button.hide();
      setIsVisible(false);
    }
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button) {
      if (loading && button.showProgress) {
        button.showProgress();
      } else if (!loading && button.hideProgress) {
        button.hideProgress();
      }
      setIsLoading(loading);
    }
  }, []);

  useEffect(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button && button.setText && button.onClick && button.offClick) {
      button.setText(text);
      button.onClick(onClick);
      return () => button.offClick(onClick);
    }
  }, [text, onClick]);

  return {
    isVisible,
    isActive,
    isLoading,
    show,
    hide,
    setLoading
  };
};
