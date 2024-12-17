import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  isAuthenticated: boolean;
  userId: number | null;
  username: string | null;
  platform: string | null;
  setSession: (data: Partial<SessionState>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      username: null,
      platform: null,
      setSession: (data) => set((state) => ({ ...state, ...data })),
      clearSession: () => set({ 
        isAuthenticated: false, 
        userId: null, 
        username: null, 
        platform: null 
      }),
    }),
    {
      name: 'telegram-session',
    }
  )
);