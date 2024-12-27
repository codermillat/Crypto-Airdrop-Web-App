import { WalletsListConfiguration } from '@tonconnect/ui-react';
import { WALLET_CONFIG, SUPPORTED_WALLETS } from './constants';

export const getWalletConnectionConfig = () => ({
  manifestUrl: WALLET_CONFIG.manifestPath,
  actionsConfiguration: {
    twaReturnUrl: WALLET_CONFIG.returnUrl,
  },
  connectionRestoration: true,
  retryInterval: WALLET_CONFIG.retryInterval
});

export const getWalletsConfig = (): WalletsListConfiguration => ({
  includeWallets: SUPPORTED_WALLETS,
  excludeWallets: []
});