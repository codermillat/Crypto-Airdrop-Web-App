export interface TonProviderProps {
  children: React.ReactNode;
}

export interface TonConnectionState {
  isConnected: boolean;
  address: string | null;
  tonConnectUI: any;
}