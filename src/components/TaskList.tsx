import React, { useEffect, useState } from 'react';
import { Check, Loader2, ListTodo } from 'lucide-react';
import { fetchTasks, claimReward } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';
import ErrorState from './ErrorState';

interface Task {
  _id: string;
  title: string;
  reward: number;
  icon: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaimingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<{ [key: string]: string }>({});
  const { address, setPoints } = useWalletStore();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError(null);
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Unable to load tasks. Please try again later.');
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      loadTasks();
    }
  }, [address]);

  const handleClaim = async (taskId: string) => {
    if (!address) return;
    
    setClaimingId(taskId);
    setClaimError(prev => ({ ...prev, [taskId]: '' }));

    try {
      const { points } = await claimReward(taskId);
      setPoints(points);
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: true } : task
      ));
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to claim reward. Please try again.';
      setClaimError(prev => ({ ...prev, [taskId]: errorMessage }));
      console.error('Failed to claim reward:', err);
    } finally {
      setClaimingId(null);
    }
  };

  if (!address) {
    return (
      <div className="text-center py-8">
        <ListTodo className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">Connect your wallet to view tasks</p>
      </div>
    );
  }

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

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <ListTodo className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">No tasks available at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task._id} className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{task.icon}</span>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-blue-500">+{task.reward} PAWS</p>
              </div>
            </div>
            {task.completed ? (
              <Check className="text-green-500" />
            ) : (
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                onClick={() => handleClaim(task._id)}
                disabled={claiming === task._id || !address}
              >
                {claiming === task._id ? (
                  <Loader2 className="animate-spin" />
                ) : 'Start'}
              </button>
            )}
          </div>
          {claimError[task._id] && (
            <p className="text-red-500 text-sm mt-2">{claimError[task._id]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;