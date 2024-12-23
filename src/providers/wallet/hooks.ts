import { useContext } from 'react';
import { WalletContext } from './context';

export const useWallet = () => useContext(WalletContext);