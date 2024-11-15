import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { fetchLeaderboard } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';
import ErrorState from './ErrorState';

interface LeaderboardUser {
  address: string;
  username: string | null;
  points: number;
}

const LeaderboardList = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useWalletStore();

  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!address) return;
      
      try {
        setError(null);
        const data = await fetchLeaderboard();
        setUsers(data);
      } catch (err: any) {
        console.error('Failed to fetch leaderboard:', err);
        setError(err?.message || 'Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [address]);

  if (!address) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">Connect wallet to view leaderboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">No leaderboard data available</p>
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
              <h3 className="font-medium">
                {user.username || `${user.address.slice(0, 8)}...${user.address.slice(-4)}`}
              </h3>
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