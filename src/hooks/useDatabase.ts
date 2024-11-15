import { useState, useEffect } from 'react';
import { fetchAllData } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

export interface DatabaseStats {
  totalUsers: number;
  totalPoints: number;
  totalTasks: number;
  totalCompletedTasks: number;
  averagePoints: number;
}

export interface DatabaseTask {
  _id: string;
  title: string;
  reward: number;
  type: string;
  requirements: string[];
  active: boolean;
  createdAt: string;
}

export interface DatabaseUser {
  address: string;
  username: string | null;
  points: number;
  referralCode: string;
  referralCount: number;
  completedTasks: string[];
  isRegistered: boolean;
  createdAt: string;
}

export interface DatabaseData {
  stats: DatabaseStats;
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
        setData(result);
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
      setData(result);
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