import { WalletsListConfiguration } from '@tonconnect/ui-react';

// Simplified wallet configuration to avoid compatibility issues
export const getWalletsConfig = (): WalletsListConfiguration => ({
  includeWallets: [{ 
    name: 'tonkeeper',
    appName: 'My Airdrop App', // Replace with actual app name
    imageUrl: '/tonkeeper.png', // Replace with actual image path
    aboutUrl: 'https://tonkeeper.com/',
    platforms: ['ios', 'android', 'chrome', 'firefox', 'safari'],
    universalLink: 'https://tonkeeper.com/app', // Placeholder
    bridgeUrl: 'https://bridge.tonapi.io/' // Placeholder
  }],
  // Remove walletsList to prevent the jsBridgeKey error
});
