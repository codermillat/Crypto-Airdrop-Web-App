import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

interface Reward {
  id: string;
  title: string;
  amount: number;
  icon: string;
  claimed: boolean;
}

const RewardsList = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const { address, setPoints } = useWalletStore();

  useEffect(() => {
    const fetchRewards = async () => {
      if (!address) return;
      
      try {
        const response = await api.get('/rewards');
        setRewards(response.data);
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [address]);

  const handleClaim = async (rewardId: string) => {
    try {
      const response = await api.post(`/rewards/${rewardId}/claim`);
      setPoints(response.data.points);
      setRewards(rewards.map(reward => 
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      ));
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  if (!address) {
    return (
      <div className="text-center text-gray-400 py-8">
        Connect wallet to view available rewards
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rewards.map(reward => (
        <div key={reward.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{reward.icon}</span>
            <div>
              <h3 className="font-medium">{reward.title}</h3>
              <p className="text-sm text-blue-500">+{reward.amount} PAWS</p>
            </div>
          </div>
          <button 
            className={`px-4 py-2 rounded-lg ${
              reward.claimed 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => handleClaim(reward.id)}
            disabled={reward.claimed}
          >
            {reward.claimed ? 'Claimed' : 'Claim'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RewardsList;