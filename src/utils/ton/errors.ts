export class TonConnectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TonConnectError';
  }
}

export class WalletConnectionError extends TonConnectError {
  constructor(message: string) {
    super(message);
    this.name = 'WalletConnectionError';
  }
}