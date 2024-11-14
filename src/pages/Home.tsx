import React, { useEffect } from 'react';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { PawPrint } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';

const Home = () => {
  const userAddress = useTonAddress();
  const setAddress = useWalletStore((state) => state.setAddress);

  useEffect(() => {
    setAddress(userAddress);
  }, [userAddress, setAddress]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">PAWS</h1>
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">✓</span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 text-center mb-6">
        <PawPrint className="w-16 h-16 mx-auto mb-4 text-white" />
        <div className="mb-4">
          <TonConnectButton />
        </div>
        <div className="text-gray-400">NEWCOMER RANK</div>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between">
          <span>Join our community</span>
          <span>→</span>
        </button>
        <button className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between">
          <span>Check your rewards</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Home;