export interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  isInitialized: boolean;
  error: Error | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface WalletState {
  isInitialized: boolean;
  error: Error | null;
  connector: any;
}