import React, { useState } from 'react';
import { Database, AlertCircle } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useWalletStore } from '../store/useWalletStore';
import DatabaseStats from '../components/DatabaseStats';
import TasksManager from '../components/admin/TasksManager';
import UsersManager from '../components/admin/UsersManager';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const ADMIN_ADDRESSES = [
  'EQAAFhjXzKuQ5N0c96nsdZQWATcJm909LYSaCAvWFxVJP80D',
  'EQBYHNxzKuQ5N0c96nsdZQWATcJm909LYSaCAvWFxVJP81C'
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'users'>('overview');
  const { data, loading, error, refresh } = useDatabase();
  const { address } = useWalletStore();

  if (!address || !ADMIN_ADDRESSES.includes(address)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400 text-center">
          You don't have permission to access the admin panel
        </p>
      </div>
    );
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={refresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Refresh Data
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'users', label: 'Users' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <DatabaseStats stats={data.stats} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {data.users.slice(0, 5).map(user => (
                  <div key={user.address} className="text-sm">
                    <span className="text-blue-500">@{user.username || user.address.slice(0, 8)}</span>
                    {' '}completed {user.completedTasks.length} tasks
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-4">Top Performers</h2>
              <div className="space-y-2">
                {data.users
                  .sort((a, b) => b.points - a.points)
                  .slice(0, 5)
                  .map(user => (
                    <div key={user.address} className="flex justify-between text-sm">
                      <span className="text-blue-500">
                        @{user.username || user.address.slice(0, 8)}
                      </span>
                      <span>{user.points.toLocaleString()} PAWS</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <TasksManager tasks={data.tasks} onUpdate={refresh} />
      )}

      {activeTab === 'users' && (
        <UsersManager users={data.users} onUpdate={refresh} />
      )}
    </div>
  );
};

export default Admin;