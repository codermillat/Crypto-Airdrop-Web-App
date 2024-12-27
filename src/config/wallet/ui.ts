import { THEME, UIPreferences } from '@tonconnect/ui-react';

export const getWalletUIConfig = (): UIPreferences => ({
  theme: THEME.DARK,
  colorsSet: {
    connectButton: {
      background: '#3B82F6',
      foreground: '#FFFFFF'
    }
  }
});