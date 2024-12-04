import { useState, useEffect } from 'react';
import { fetchAllData } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  activeTasks: number;
  totalPoints: number;
}

export interface DatabaseTask {
  _id: string;
  title: string;
  description: string;
  reward: number;
  type: string;
  requirements: string[];
  isActive: boolean;
  completionCount: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface DatabaseUser {
  address: string;
  username: string | null;
  points: number;
  role: 'user' | 'admin';
  isActive: boolean;
  referralCode: string;
  referralCount: number;
  completedTasks: string[];
  lastLogin?: string;
  createdAt: string;
  isRegistered: boolean;
}

export interface DatabaseData {
  stats: AdminStats;
  tasks: DatabaseTask[];
  users: DatabaseUser[];
}

export const useDatabase = () => {
  const [data, setData] = useState<DatabaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useWalletStore();

  useEffect(() => {
    const loadData = async () => {
      if (!address) return;

      try {
        setLoading(true);
        const result = await fetchAllData();
        setData(result.data); // Extract data from AxiosResponse
        setError(null);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch database data');
        console.error('Error loading database data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [address]);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await fetchAllData();
      setData(result.data); // Extract data from AxiosResponse
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to refresh database data');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refresh
  };
};

export default useDatabase;
