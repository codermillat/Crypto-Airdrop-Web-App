import { getConfig } from './index';

export const getManifestUrl = (): string => {
  const { siteUrl } = getConfig();
  return `${siteUrl}/tonconnect-manifest.json`;
};