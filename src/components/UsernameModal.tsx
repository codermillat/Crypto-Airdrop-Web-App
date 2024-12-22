import React, { useState, useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { Loader2, AlertCircle } from 'lucide-react';
import { registerUser } from '../utils/api';
import { getTelegramWebAppUser, validateTelegramUser } from '../utils/telegram';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UsernameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUsername: setStoreUsername, setIsRegistered, isRegistered } = useWalletStore();

  useEffect(() => {
    if (isRegistered) {
      onClose();
    }
  }, [isRegistered, onClose]);

  useEffect(() => {
    const registerTelegramUser = async () => {
      const tgUser = getTelegramWebAppUser();
      
      if (!validateTelegramUser(tgUser)) {
        setError('Telegram username is required. Please set a username in Telegram first.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await registerUser(
          tgUser.username!,
          tgUser.id.toString()
        );

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

    if (isOpen && !isRegistered) {
      registerTelegramUser();
    }
  }, [isOpen, isRegistered, setStoreUsername, setIsRegistered, onClose]);

  if (!isOpen || isRegistered) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          {loading ? (
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
              <p>Registering your account...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
              <p className="text-red-500">{error}</p>
              {error.includes('username') && (
                <a
                  href="https://telegram.org/faq#q-what-are-usernames-how-do-i-get-one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 block"
                >
                  Learn how to set a Telegram username
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
              <p>Checking Telegram account...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;