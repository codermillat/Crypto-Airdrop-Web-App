// Re-export all telegram utilities
export * from './types/user';
export * from './types/webapp';
export * from './environment/detection';
export * from './environment/info';
export * from './webapp/initialization';
export * from './webapp/errors';
export * from './debug';

// Export commonly used functions directly
export { isTelegramEnvironment } from './environment/detection';
export { getEnvironmentInfo } from './environment/info';
export { initializeWebApp } from './webapp/initialization';
export { debugTelegramEnvironment } from './debug';

// Export user-related functions
export const getTelegramWebAppUser = () => window.Telegram?.WebApp?.initDataUnsafe?.user || null;
export const validateTelegramUser = (user: any) => {
  if (!user) return false;
  return !!(user.id && user.first_name);
};