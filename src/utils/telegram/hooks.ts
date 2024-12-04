import { useState, useEffect } from 'react';
import { getWebAppData } from './webapp';
import { TelegramSecurityError } from './security';

export const useWebAppUser = () => {
  const [user, setUser] = useState(window.Telegram?.WebApp?.initDataUnsafe?.user || null);
  const [error, setError] = useState<TelegramSecurityError | null>(null);

  useEffect(() => {
    try {
      const webAppData = getWebAppData();
      setUser(webAppData?.user || null);
      setError(null);
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
    (window.Telegram?.WebApp as any)?.onEvent?.('themeChanged', handleThemeChange);
    return () => (window.Telegram?.WebApp as any)?.offEvent?.('themeChanged', handleThemeChange);
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
    (window.Telegram?.WebApp as any)?.onEvent?.('viewportChanged', handleViewportChange);
    return () => (window.Telegram?.WebApp as any)?.offEvent?.('viewportChanged', handleViewportChange);
  }, []);

  return viewport;
};

export const useMainButton = (text: string, onClick: () => void) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const button = window.Telegram?.WebApp?.MainButton as any;
    button?.setText?.(text);
    button?.onClick?.(onClick);
    return () => button?.offClick?.(onClick);
  }, [text, onClick]);

  const show = () => {
    const button = window.Telegram?.WebApp?.MainButton as any;
    button?.show?.();
    setIsVisible(true);
  };

  const hide = () => {
    const button = window.Telegram?.WebApp?.MainButton as any;
    button?.hide?.();
    setIsVisible(false);
  };

  const setLoading = (loading: boolean) => {
    const button = window.Telegram?.WebApp?.MainButton as any;
    if (loading) {
      button?.showProgress?.();
    } else {
      button?.hideProgress?.();
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
