export const debugLog = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Debug] ${message}`, ...args);
  }
};