import React from 'react';
import ReferralSystem from '../components/ReferralSystem';
import FriendsList from '../components/FriendsList';

const Friends = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">INVITE FRIENDS</h1>
      <ReferralSystem />
      <FriendsList />
    </div>
  );
};

export default Friends;