import React, { useState, useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { Loader2, X, AlertCircle } from 'lucide-react';
import { registerUser } from '../utils/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UsernameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUsername: setStoreUsername, setIsRegistered, isRegistered } = useWalletStore();

  useEffect(() => {
    // Close modal if user is already registered
    if (isRegistered) {
      onClose();
    }
  }, [isRegistered, onClose]);

  useEffect(() => {
    // Check for Telegram WebApp data
    if (window.Telegram?.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser?.id) {
        setTelegramId(tgUser.id.toString());
        if (tgUser.username) {
          setUsername(tgUser.username);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await registerUser(username.trim().toLowerCase(), telegramId);
      if (response?.user) {
        setStoreUsername(response.user.username);
        setIsRegistered(true);
        onClose();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Failed to register username. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || isRegistered) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Set Username</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white absolute top-4 right-4"
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
                const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                setUsername(value);
                setError('');
              }}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username (letters, numbers, underscore)"
              minLength={3}
              maxLength={20}
              disabled={loading || !!telegramId}
              autoFocus
            />
            {error && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <p className="text-gray-400 text-sm mt-2">
              {telegramId ? 'Using Telegram username' : 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores.'}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || username.length < 3}
            className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Setting Username...</span>
              </>
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