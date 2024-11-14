import React from 'react';

const users = [
  { id: 1, name: 'imGet', points: 79375130, rank: 1 },
  { id: 2, name: 'Pishnahad_Sup', points: 59286961, rank: 2 },
  { id: 3, name: 'Esalat', points: 50438903, rank: 3 }
];

const LeaderboardList = () => {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              #{user.rank}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-blue-500">{user.points.toLocaleString()} PAWS</p>
            </div>
          </div>
          <div className="text-yellow-500">
            {user.rank === 1 && '🥇'}
            {user.rank === 2 && '🥈'}
            {user.rank === 3 && '🥉'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardList;