import { THEME, UIPreferences } from '@tonconnect/ui-react';

export const getUIPreferences = (): UIPreferences => ({
  theme: THEME.DARK,
  colorsSet: {
    connectButton: {
      background: '#3B82F6',
      foreground: '#FFFFFF'
    }
  }
});