export const getEnvironment = () => ({
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  baseUrl: window.location.origin
});