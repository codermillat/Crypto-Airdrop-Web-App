import React from 'react';
import { useAppInitialization } from '../hooks/useAppInitialization';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const { isLoading, error, isInitialized } = useAppInitialization();

  if (isLoading) {
    return <LoadingState message="Initializing app..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!isInitialized) {
    return <ErrorState message="Failed to initialize app" />;
  }

  return <>{children}</>;
};

export default AppInitializer;