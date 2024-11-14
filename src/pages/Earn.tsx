import React from 'react';
import { Wallet } from 'lucide-react';
import RewardsList from '../components/RewardsList';
import { useWalletStore } from '../store/useWalletStore';

const Earn = () => {
  const { points } = useWalletStore();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">EARN REWARDS</h1>
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <Wallet className="w-12 h-12 mb-4 text-blue-500" />
        <h2 className="text-xl font-bold mb-2">Available Balance</h2>
        <div className="text-3xl font-bold text-blue-500">{points} PAWS</div>
      </div>
      <RewardsList />
    </div>
  );
};

export default Earn;