import React, { useState } from 'react';
import { Database, AlertCircle } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useWalletStore } from '../store/useWalletStore';
import AdminStatsDisplay from '../components/DatabaseStats';
import TasksManager from '../components/admin/TasksManager';
import UsersManager from '../components/admin/UsersManager';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'users'>('overview');
  const { data, loading, error, refresh } = useDatabase();
  const { address } = useWalletStore();

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Connect Wallet</h1>
        <p className="text-gray-400 text-center">
          Please connect your wallet to access the admin panel
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

      {activeTab === 'overview' && <AdminStatsDisplay stats={data.stats} />}
      {activeTab === 'tasks' && <TasksManager tasks={data.tasks} onUpdate={refresh} />}
      {activeTab === 'users' && <UsersManager users={data.users} onUpdate={refresh} />}
    </div>
  );
};

export default Admin;