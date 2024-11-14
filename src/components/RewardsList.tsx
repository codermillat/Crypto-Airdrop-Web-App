import React from 'react';
import { Gift } from 'lucide-react';

const rewards = [
  { id: 1, title: 'Daily Bonus', amount: 100, icon: '🎁' },
  { id: 2, title: 'Task Completion', amount: 250, icon: '✨' },
  { id: 3, title: 'Referral Bonus', amount: 500, icon: '👥' }
];

const RewardsList = () => {
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default RewardsList;