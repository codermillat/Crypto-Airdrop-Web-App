import { debugLog } from '../debug';
import { WebAppError } from './errors';

interface WebAppState {
  isInitialized: boolean;
  isConfigured: boolean;
  platform: string;
  colorScheme: 'light' | 'dark';
  error: string | null;
}

let state: WebAppState = {
  isInitialized: false,
  isConfigured: false,
  platform: 'unknown',
  colorScheme: 'dark',
  error: null
};

export const getWebAppState = (): WebAppState => ({ ...state });

export const updateWebAppState = (updates: Partial<WebAppState>): void => {
  state = { ...state, ...updates };
  debugLog('WebApp state updated:', state);
};

export const resetWebAppState = (): void => {
  state = {
    isInitialized: false,
    isConfigured: false,
    platform: 'unknown',
    colorScheme: 'dark',
    error: null
  };
  debugLog('WebApp state reset');
};