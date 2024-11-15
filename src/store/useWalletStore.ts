import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  username: string | null;
  balance: number;
  points: number;
  referralCode: string | null;
  isRegistered: boolean;
  setAddress: (address: string | null) => void;
  setUsername: (username: string | null) => void;
  setBalance: (balance: number) => void;
  setPoints: (points: number) => void;
  setReferralCode: (code: string | null) => void;
  setIsRegistered: (status: boolean) => void;
  resetWalletState: () => void;
}

const initialState = {
  address: null,
  username: null,
  balance: 0,
  points: 0,
  referralCode: null,
  isRegistered: false,
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      ...initialState,
      setAddress: (address) => {
        set({ address });
        if (address) {
          localStorage.setItem('wallet_address', address);
        } else {
          localStorage.removeItem('wallet_address');
        }
      },
      setUsername: (username) => set({ username }),
      setBalance: (balance) => set({ balance }),
      setPoints: (points) => set({ points }),
      setReferralCode: (code) => set({ referralCode: code }),
      setIsRegistered: (status) => set({ isRegistered: status }),
      resetWalletState: () => set(initialState),
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        address: state.address,
        username: state.username,
        points: state.points,
        referralCode: state.referralCode,
        isRegistered: state.isRegistered,
      }),
    }
  )
);