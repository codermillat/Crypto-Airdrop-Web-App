export interface WalletData {
  address: string | null;
  points?: number;
  username?: string;
  referralCode?: string;
}

export interface WalletState {
  isInitialized: boolean;
  error: Error | null;
}