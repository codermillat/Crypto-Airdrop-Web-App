import { WalletsListConfiguration } from '@tonconnect/ui-react';

// Simplified wallet configuration to avoid compatibility issues
export const getWalletsConfig = (): WalletsListConfiguration => ({
  includeWallets: [{
    name: 'tonkeeper',
    appName: 'TonFunZone',
    imageUrl: '/logo.png',
    aboutUrl: 'https://tonkeeper.com/',
    platforms: ['ios', 'android', 'chrome', 'firefox', 'safari'],
    universalLink: 'https://tonkeeper.com/app',
    bridgeUrl: 'https://bridge.tonapi.io/'
  }],
  // Remove walletsList to prevent the jsBridgeKey error
});
