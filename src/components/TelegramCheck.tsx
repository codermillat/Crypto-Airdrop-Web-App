import React, { useEffect, useState } from 'react';
import { AlertCircle, Bug } from 'lucide-react';
import { initializeWebApp } from '../utils/telegram/webapp/initialization';
import { isTelegramWebApp } from '../utils/telegram/webapp/detection';
import { debugTelegramEnvironment } from '../utils/telegram/debug';
import LoadingState from './LoadingState';

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Get debug info first
        const debug = debugTelegramEnvironment();
        setDebugInfo(debug);

        if (!isTelegramWebApp()) {
          throw new Error('Please open this app in Telegram');
        }

        await initializeWebApp();
        
        if (mounted) {
          setIsValid(true);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to initialize Telegram WebApp');
          setIsValid(false);
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  if (isInitializing) {
    return <LoadingState message="Initializing Telegram WebApp..." />;
  }

  if (!isValid || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          
          <a 
            href="https://t.me/TonFunZoneBot"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Open in Telegram
          </a>

          <div className="mt-8">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="flex items-center justify-center space-x-2 mx-auto text-gray-400 hover:text-gray-300"
            >
              <Bug size={16} />
              <span>{showDebug ? 'Hide' : 'Show'} Debug Info</span>
            </button>

            {showDebug && debugInfo && (
              <div className="mt-4 text-left bg-gray-900 p-4 rounded-lg text-xs">
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramCheck;