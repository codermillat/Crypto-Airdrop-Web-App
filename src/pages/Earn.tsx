import { Wallet } from 'lucide-react';
import RewardsList from '../components/RewardsList';
import { useWalletStore } from '../store/useWalletStore';

const getRank = (points: number): string => {
  if (points >= 10000) return 'LEGENDARY';
  if (points >= 5000) return 'EXPERT';
  if (points >= 2500) return 'ADVANCED';
  if (points >= 1000) return 'INTERMEDIATE';
  return 'NEWCOMER';
};

const Earn = () => {
  const { points } = useWalletStore();
  const rank = getRank(points);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">EARN REWARDS</h1>
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <Wallet className="w-12 h-12 mb-4 text-blue-500" />
        <h2 className="text-xl font-bold mb-2">Available Balance</h2>
        <div className="text-3xl font-bold text-blue-500 mb-2">{points} PAWS</div>
        <div className="text-sm text-gray-400">
          Current Status: <span className="text-blue-500">{rank} RANK</span>
        </div>
      </div>
      <RewardsList />
    </div>
  );
};

export default Earn;