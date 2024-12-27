import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

export const useTonConnection = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return {
    isConnected: !!address,
    address,
    tonConnectUI
  };
};