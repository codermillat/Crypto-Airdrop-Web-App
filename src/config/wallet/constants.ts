export const WALLET_CONFIG = {
  connectOnMount: false,
  returnUrl: window.location.origin,
  manifestPath: '/tonconnect-manifest.json',
  retryInterval: 3000,
  maxRetries: 3
} as const;

export const SUPPORTED_WALLETS = ['tonkeeper', 'tonhub', 'mytonwallet'] as const;