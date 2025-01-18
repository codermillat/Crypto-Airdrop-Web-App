import React, { useState, useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { Loader2, AlertCircle } from 'lucide-react';
import { registerUser } from '../utils/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UsernameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUsername: setStoreUsername, setIsRegistered, isRegistered } = useWalletStore();

  useEffect(() => {
    if (isRegistered) {
      onClose();
    }
  }, [isRegistered, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await registerUser(username);

      if (response?.user) {
        setStoreUsername(response.user.username);
        setIsRegistered(true);
        onClose();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || isRegistered) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Set Username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            disabled={loading}
          />
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={loading || !username.trim()}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Set Username'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;