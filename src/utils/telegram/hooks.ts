import { useState, useEffect, useCallback } from 'react';
import { WebAppInitData } from './types';
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

    window.Telegram?.WebApp?.onEvent('themeChanged', handleThemeChange);
    return () => {
      window.Telegram?.WebApp?.offEvent('themeChanged', handleThemeChange);
    };
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

    window.Telegram?.WebApp?.onEvent('viewportChanged', handleViewportChange);
    return () => {
      window.Telegram?.WebApp?.offEvent('viewportChanged', handleViewportChange);
    };
  }, []);

  return viewport;
};

export const useMainButton = (text: string, onClick: () => void) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const show = useCallback(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button) {
      button.show();
      setIsVisible(true);
    }
  }, []);

  const hide = useCallback(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button) {
      button.hide();
      setIsVisible(false);
    }
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button) {
      if (loading) {
        button.showProgress();
      } else {
        button.hideProgress();
      }
      setIsLoading(loading);
    }
  }, []);

  useEffect(() => {
    const button = window.Telegram?.WebApp?.MainButton;
    if (button) {
      button.setText(text);
      button.onClick(onClick);
      
      return () => {
        button.offClick(onClick);
      };
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