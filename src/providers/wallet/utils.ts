import { WalletData } from './types';
import { registerWallet } from '../../utils/api';

// Add initialization check utility
export const isTonConnectUIReady = (tonConnectUI: any): boolean => {
  return !!(tonConnectUI && tonConnectUI.connector);
};

export const registerOrFetchWallet = async (
  address: string | null,
  callbacks: {
    setPoints: (points: number) => void;
    setUsername: (username: string | null) => void;
    setIsRegistered: (status: boolean) => void;
    setReferralCode: (code: string | null) => void;
  },
  retryCount = 3
): Promise<WalletData | null> => {
  if (!address) return null;

  try {
    const userData: WalletData = await registerWallet(address);

    if (!userData || !userData.address) {
      throw new Error('Invalid wallet data received');
    }

    callbacks.setPoints(userData.points || 0);
    callbacks.setUsername(userData.username || null);
    callbacks.setIsRegistered(!!userData.username);
    callbacks.setReferralCode(userData.referralCode || null);
    
    return userData;
  } catch (err: any) {
    if (retryCount > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return registerOrFetchWallet(address, callbacks, retryCount - 1);
    }
    throw new Error(`Failed to register or fetch wallet: ${err.message}`);
  }
};

export const initializeWalletConnection = async (
  tonConnectUI: any,
  timeout = 10000
): Promise<void> => {
  if (!tonConnectUI) {
    throw new Error('TON Connect UI not available');
  }

  // Wait for connector to be available
  const startTime = Date.now();
  while (!isTonConnectUIReady(tonConnectUI)) {
    if (Date.now() - startTime > timeout) {
      throw new Error('TON Connect UI initialization timed out');
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Wallet initialization timed out')), timeout);
  });

  await Promise.race([
    tonConnectUI.connectionRestored,
    timeoutPromise
  ]).catch(err => {
    console.warn('Connection restoration warning:', err);
  });
};