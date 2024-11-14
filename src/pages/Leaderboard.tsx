import React from 'react';
import LeaderboardList from '../components/LeaderboardList';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
        <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <div className="text-lg">Total</div>
        <div className="text-2xl font-bold">34,195,817 users</div>
      </div>
      <LeaderboardList />
    </div>
  );
};

export default Leaderboard;