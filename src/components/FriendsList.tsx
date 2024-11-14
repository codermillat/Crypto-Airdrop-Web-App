import React from 'react';

const friends = [
  { id: 1, name: 'Khusbu1030', points: 116, date: 'November 13 at 08:00' },
  { id: 2, name: 'nothing_ind', points: 152, date: 'November 13 at 08:00' }
];

const FriendsList = () => {
  return (
    <div className="space-y-4">
      {friends.map(friend => (
        <div key={friend.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <h3 className="font-medium">{friend.name}</h3>
              <p className="text-sm text-gray-400">{friend.date}</p>
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