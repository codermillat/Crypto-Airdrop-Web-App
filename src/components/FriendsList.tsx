import React, { useEffect, useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import { fetchReferrals } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';
import ErrorState from './ErrorState';

interface Friend {
  username: string;
  points: number;
  joinedAt: string;
}

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useWalletStore();

  useEffect(() => {
    const loadReferrals = async () => {
      if (!address) return;
      
      try {
        setError(null);
        const data = await fetchReferrals();
        setFriends(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error('Failed to load referrals:', err);
        setError(err?.message || 'Unable to load referrals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadReferrals();
  }, [address]);

  if (!address) return null;

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

  if (friends.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">
          No referrals yet. Share your code to invite friends!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friends.map((friend, index) => (
        <div key={index} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <h3 className="font-medium">@{friend.username}</h3>
              <p className="text-sm text-gray-400">
                {new Date(friend.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-green-500">
            +{friend.points} PAWS
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;