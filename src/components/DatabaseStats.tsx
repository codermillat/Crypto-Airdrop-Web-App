import React from 'react';
import { Users, Award, CheckSquare } from 'lucide-react';
import { DatabaseStats } from '../hooks/useDatabase';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-gray-900 rounded-lg p-4">
    <div className="flex items-center space-x-3 mb-2">
      {icon}
      <h3 className="text-sm text-gray-400">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

interface Props {
  stats: DatabaseStats;
}

const DatabaseStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers} 
        icon={<Users className="w-5 h-5 text-blue-500" />}
      />
      <StatCard 
        title="Total Points" 
        value={stats.totalPoints.toLocaleString()} 
        icon={<Award className="w-5 h-5 text-yellow-500" />}
      />
      <StatCard 
        title="Tasks Created" 
        value={stats.totalTasks} 
        icon={<CheckSquare className="w-5 h-5 text-green-500" />}
      />
      <StatCard 
        title="Avg Points/User" 
        value={stats.averagePoints.toLocaleString()} 
        icon={<Award className="w-5 h-5 text-purple-500" />}
      />
    </div>
  );
};

export default DatabaseStats;