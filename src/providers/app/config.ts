import { THEME } from '@tonconnect/ui-react';

export const getTonConnectPreferences = () => ({
  theme: THEME.DARK,
  colorsSet: {
    connectButton: {
      background: '#3B82F6',
      foreground: '#FFFFFF'
    }
  }
});

export const getWalletsList = () => ({
  // Only include wallets that are fully supported
  includeWallets: [
    'tonkeeper',
    'tonhub',
    'mytonwallet'
  ],
  excludeWallets: []
});

export const getConnectionConfig = () => ({
  manifestUrl: '/tonconnect-manifest.json',
  actionsConfiguration: {
    twaReturnUrl: window.location.origin,
  },
  connectionRestoration: true,
  retryInterval: 3000
});