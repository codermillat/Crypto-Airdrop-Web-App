import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  balance: number;
  points: number;
  setAddress: (address: string | null) => void;
  setBalance: (balance: number) => void;
  setPoints: (points: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      balance: 0,
      points: 0,
      setAddress: (address) => {
        set({ address });
        if (address) {
          localStorage.setItem('wallet_address', address);
        } else {
          localStorage.removeItem('wallet_address');
        }
      },
      setBalance: (balance) => set({ balance }),
      setPoints: (points) => set({ points }),
    }),
    {
      name: 'wallet-storage',
    }
  )
);