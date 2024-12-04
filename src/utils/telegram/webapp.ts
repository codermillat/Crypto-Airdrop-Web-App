import { WebAppInitData } from './types';
import { validateInitData, verifyWebAppData, TelegramSecurityError } from './security';

export const getWebAppData = (): WebAppInitData | null => {
  try {
    if (!window.Telegram?.WebApp) return null;
    
    const { initDataUnsafe, initData } = window.Telegram.WebApp;
    if (!initData || !initDataUnsafe) return null;

    // Validate init data hash
    if (!validateInitData(initData)) {
      throw new TelegramSecurityError(
        'Invalid initialization data',
        'INVALID_HASH'
      );
    }

    const webAppData: WebAppInitData = {
      ...initDataUnsafe,
      auth_date: initDataUnsafe.auth_date,
      hash: initDataUnsafe.hash
    };

    // Verify the data
    verifyWebAppData(webAppData);

    return webAppData;
  } catch (error) {
    if (error instanceof TelegramSecurityError) {
      console.error(`Telegram security error: ${error.code}`, error.message);
    } else {
      console.error('Error getting WebApp data:', error);
    }
    return null;
  }
};

export const setupWebApp = () => {
  if (!window.Telegram?.WebApp) return;
  
  const webapp = window.Telegram.WebApp;
  
  // Expand to full height
  webapp.expand();
  
  // Set theme
  webapp.setHeaderColor('#000000');
  webapp.setBackgroundColor('#000000');
  
  // Enable haptic feedback
  if (webapp.HapticFeedback) {
    webapp.HapticFeedback.notificationOccurred('success');
  }
  
  // Handle back button
  if (webapp.BackButton) {
    webapp.BackButton.onClick(() => {
      if (window.history.length > 1) {
        window.history.back();
      }
    });
  }

  // Handle main button
  if (webapp.MainButton) {
    webapp.MainButton.setParams({
      text: 'CONTINUE',
      color: '#2196F3',
      text_color: '#ffffff',
      is_active: true,
      is_visible: true
    });
  }
  
  // Handle viewport changes
  webapp.onEvent('viewportChanged', () => {
    const isExpanded = webapp.isExpanded;
    if (!isExpanded) {
      webapp.expand();
    }
  });
  
  // Mark as ready
  webapp.ready();
};

export const showAlert = (message: string) => {
  window.Telegram?.WebApp?.showAlert(message);
};

export const showConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    window.Telegram?.WebApp?.showConfirm(message, resolve);
  });
};

export const showPopup = (params: {
  title?: string;
  message: string;
  buttons?: Array<{
    id: string;
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    text: string;
  }>;
}): Promise<string> => {
  return new Promise((resolve) => {
    window.Telegram?.WebApp?.showPopup(params, resolve);
  });
};

export const closeWebApp = () => {
  window.Telegram?.WebApp?.close();
};

export const openTelegramLink = (url: string) => {
  window.Telegram?.WebApp?.openTelegramLink(url);
};

export const openLink = (url: string, options?: { try_instant_view?: boolean }) => {
  window.Telegram?.WebApp?.openLink(url, options);
};

export const requestContact = (message?: string): Promise<{ phone_number: string }> => {
  return new Promise((resolve, reject) => {
    const webapp = window.Telegram?.WebApp;
    if (!webapp?.requestContact) {
      reject(new Error('Contact request not supported'));
      return;
    }
    webapp.requestContact(resolve, message);
  });
};

export const requestWriteAccess = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const webapp = window.Telegram?.WebApp;
    if (!webapp?.requestWriteAccess) {
      reject(new Error('Write access request not supported'));
      return;
    }
    webapp.requestWriteAccess(resolve);
  });
};