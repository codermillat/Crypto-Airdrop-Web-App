import React, { useState } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { Loader2, X } from 'lucide-react';
import { registerUser } from '../utils/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UsernameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUsername: setStoreUsername, setIsRegistered } = useWalletStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { user } = await registerUser(username.trim().toLowerCase());
      setStoreUsername(user.username);
      setIsRegistered(true);
      onClose();
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Failed to register username. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Set Username</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose a unique username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''));
                setError('');
              }}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username (letters, numbers, underscore)"
              minLength={3}
              maxLength={20}
              disabled={loading}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <p className="text-gray-400 text-sm mt-2">
              Username must be 3-20 characters long and can only contain letters, numbers, and underscores.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || username.length < 3}
            className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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