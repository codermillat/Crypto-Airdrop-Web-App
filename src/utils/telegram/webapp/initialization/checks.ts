import { debugLog } from '../../debug';
import { isWebAppAvailable, isWebAppReady } from '../detection';

const READY_CHECK_INTERVAL = 50; // ms
const MAX_READY_CHECKS = 100; // 5 seconds total

export const waitForWebAppReady = async (): Promise<void> => {
  let checks = 0;
  
  while (checks < MAX_READY_CHECKS) {
    if (isWebAppReady()) {
      debugLog('WebApp is ready');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, READY_CHECK_INTERVAL));
    checks++;
    
    if (checks % 20 === 0) {
      debugLog(`Waiting for WebApp to be ready... (${checks / 20}s)`);
    }
  }
  
  throw new Error('WebApp initialization timed out');
};

export const performInitialChecks = async (): Promise<void> => {
  debugLog('Performing initial WebApp checks');

  if (!isWebAppAvailable()) {
    throw new Error('Telegram WebApp is not available');
  }

  await waitForWebAppReady();
};
