import React, { useState } from 'react';
import { Search, Award, Users, Ban, CheckCircle } from 'lucide-react';
import { DatabaseUser } from '../../hooks/useDatabase';
import api from '../../utils/api';

interface Props {
  users: DatabaseUser[];
  onUpdate: () => void;
}

const UsersManager: React.FC<Props> = ({ users, onUpdate }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'referrals'>('points');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBanUser = async (address: string) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return;

    setLoading(true);
    try {
      await api.post(`/api/users/${address}/ban`);
      onUpdate();
    } catch (err: any) {
      setError(err?.message || 'Failed to ban user');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = search.toLowerCase();
    return (
      user.address.toLowerCase().includes(searchLower) ||
      (user.username?.toLowerCase().includes(searchLower))
    );
  }).sort((a, b) => {
    if (sortBy === 'points') {
      return b.points - a.points;
    }
    return b.referralCount - a.referralCount;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Users</h2>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'points' | 'referrals')}
            className="bg-gray-900 rounded-lg px-4 py-2"
          >
            <option value="points">Sort by Points</option>
            <option value="referrals">Sort by Referrals</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-900 rounded-lg pl-10 pr-4 py-2 w-64"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map(user => (
          <div key={user.address} className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">
                    {user.username || user.address.slice(0, 8)}...{user.address.slice(-6)}
                  </h3>
                  {user.isRegistered && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleBanUser(user.address)}
                className="text-red-500 hover:text-red-400"
                disabled={loading}
              >
                <Ban size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-400">Points</span>
                </div>
                <p className="text-lg font-bold">{user.points.toLocaleString()}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-400">Referrals</span>
                </div>
                <p className="text-lg font-bold">{user.referralCount}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-400">Tasks</span>
                </div>
                <p className="text-lg font-bold">{user.completedTasks.length}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Referral Code: <span className="font-mono">{user.referralCode}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UsersManager;