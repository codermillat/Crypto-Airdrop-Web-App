import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchLeaderboard } from '../utils/api';

interface LeaderboardUser {
  address: string;
  points: number;
}

const LeaderboardList = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={user.address} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              #{index + 1}
            </div>
            <div>
              <h3 className="font-medium">{user.address.slice(0, 8)}...{user.address.slice(-4)}</h3>
              <p className="text-sm text-blue-500">{user.points.toLocaleString()} PAWS</p>
            </div>
          </div>
          <div className="text-yellow-500">
            {index === 0 && '🥇'}
            {index === 1 && '🥈'}
            {index === 2 && '🥉'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardList;