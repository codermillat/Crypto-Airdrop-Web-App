import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardList from '../components/LeaderboardList';
import { fetchLeaderboard } from '../utils/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const Leaderboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchLeaderboard();
        setTotalUsers(data.data.length);
        setError(null);
      } catch (err: any) {
        setError(err?.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
        <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <div className="text-lg">Active Users</div>
        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
      </div>
      <LeaderboardList />
    </div>
  );
};

export default Leaderboard;
