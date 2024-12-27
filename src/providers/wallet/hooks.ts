import { useCallback, useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { WalletState } from './types';

const INIT_TIMEOUT = 30000;
const INIT_CHECK_INTERVAL = 100;

export const useWalletInitialization = (): WalletState => {
  const [state, setState] = useState<WalletState>({
    isInitialized: false,
    error: null,
    connector: null
  });
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    let mounted = true;
    let initTimeout: NodeJS.Timeout;
    let checkInterval: NodeJS.Timeout;

    const initialize = async () => {
      try {
        if (!tonConnectUI) {
          throw new Error('TON Connect UI not available');
        }

        // Wait for connector to be fully initialized
        const waitForConnector = new Promise<void>((resolve, reject) => {
          checkInterval = setInterval(() => {
            if (tonConnectUI.connector) {
              clearInterval(checkInterval);
              resolve();
            }
          }, INIT_CHECK_INTERVAL);
        });

        const timeoutPromise = new Promise((_, reject) => {
          initTimeout = setTimeout(() => {
            clearInterval(checkInterval);
            reject(new Error('Wallet initialization timed out'));
          }, INIT_TIMEOUT);
        });

        await Promise.race([
          waitForConnector,
          timeoutPromise
        ]);

        // Now wait for connection restoration
        await tonConnectUI.connectionRestored.catch(err => {
          console.warn('Connection restoration warning:', err);
        });

        if (mounted) {
          setState({
            isInitialized: true,
            error: null,
            connector: tonConnectUI
          });
        }
      } catch (err) {
        if (mounted) {
          setState({
            isInitialized: true,
            error: err instanceof Error ? err : new Error('Failed to initialize wallet'),
            connector: null
          });
        }
      } finally {
        clearTimeout(initTimeout);
        clearInterval(checkInterval);
      }
    };

    initialize();

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
      clearInterval(checkInterval);
    };
  }, [tonConnectUI]);

  return state;
};

export const useWalletConnection = (connector: any) => {
  const connect = useCallback(async () => {
    if (!connector?.connector) {
      throw new Error('TON Connect UI not available');
    }

    try {
      await connector.connectWallet();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to connect wallet');
    }
  }, [connector]);

  const disconnect = useCallback(async () => {
    if (!connector?.connector) {
      throw new Error('TON Connect UI not available');
    }

    try {
      await connector.disconnect();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to disconnect wallet');
    }
  }, [connector]);

  return { connect, disconnect };
};