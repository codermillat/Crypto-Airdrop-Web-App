import React from 'react';
import { Share2 } from 'lucide-react';

const ReferralSystem = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-2">SHARE YOUR INVITATION LINK &</h2>
      <h3 className="text-xl text-blue-500 mb-6">GET 10% OF FRIEND'S POINTS</h3>
      
      <button className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
        <Share2 size={20} />
        <span>Invite Friends</span>
      </button>
      
      <div className="mt-4 text-center text-gray-400">
        <p>Total Referrals: 2 users</p>
      </div>
    </div>
  );
};

export default ReferralSystem;