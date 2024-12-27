import { getConfig } from './index';

export const getManifestUrl = (): string => {
  const { siteUrl } = getConfig();
  // Use relative path for manifest in development
  if (import.meta.env.DEV) {
    return '/tonconnect-manifest.json';
  }
  return `${siteUrl}/tonconnect-manifest.json`;
};