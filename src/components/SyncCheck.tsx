import React, { useEffect, useState } from 'react';
import { syncServices } from '../utils/sync';
import LoadingState from './common/LoadingState';
import ErrorState from './common/ErrorState';

interface Props {
  children: React.ReactNode;
}

const SyncCheck: React.FC<Props> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSync = async () => {
      try {
        const { status, error } = await syncServices();
        
        if (error) {
          setError(error);
          return;
        }

        const allServicesUp = Object.values(status).every(Boolean);
        if (!allServicesUp) {
          setError('Some services are not available. Please try again later.');
          return;
        }

        setError(null);
      } catch (err) {
        setError('Failed to check service status');
      } finally {
        setIsChecking(false);
      }
    };

    checkSync();
  }, []);

  if (isChecking) {
    return <LoadingState message="Checking services..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return <>{children}</>;
};

export default SyncCheck;