import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { fetchTasks, claimReward } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

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
  const { address, setPoints } = useWalletStore();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
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
    try {
      const { points } = await claimReward(taskId);
      setPoints(points);
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error('Failed to claim reward:', error);
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task._id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              onClick={() => handleClaim(task._id)}
              disabled={claiming === task._id || !address}
            >
              {claiming === task._id ? (
                <Loader2 className="animate-spin" />
              ) : 'Start'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;