import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

interface Friend {
  username: string;
  points: number;
  joinedAt: string;
}

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useWalletStore();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!address) return;
      
      try {
        const response = await api.get('/referrals');
        setFriends(response.data);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [address]);

  if (!address) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No referrals yet. Share your code to invite friends!
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