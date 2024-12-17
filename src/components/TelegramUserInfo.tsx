import React from 'react';
import { useTelegramUser } from '../hooks/useTelegramUser';
import { AlertCircle, User, Star } from 'lucide-react';
import LoadingState from './LoadingState';

const TelegramUserInfo = () => {
  const { user, isLoading, error } = useTelegramUser();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-400">Unable to load user information</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Telegram Profile</h2>
        {user.is_premium && (
          <div className="flex items-center text-yellow-500">
            <Star className="w-5 h-5 mr-1" />
            <span className="text-sm">Premium</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-medium">
            {user.first_name} {user.last_name || ''}
          </h3>
          {user.username && (
            <p className="text-blue-500">@{user.username}</p>
          )}
          <p className="text-sm text-gray-400">ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default TelegramUserInfo;