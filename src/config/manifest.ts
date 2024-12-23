import { getConfig } from '../utils/config';

export const getManifestUrl = () => {
  const { siteUrl } = getConfig();
  return `${siteUrl}/tonconnect-manifest.json`;
};