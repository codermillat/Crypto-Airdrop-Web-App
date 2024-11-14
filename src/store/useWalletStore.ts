import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  balance: number;
  setAddress: (address: string | null) => void;
  setBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      balance: 0,
      setAddress: (address) => set({ address }),
      setBalance: (balance) => set({ balance }),
    }),
    {
      name: 'wallet-storage',
    }
  )
);