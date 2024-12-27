import { getConfig } from '../app';

export const getManifestUrl = (): string => {
  // Always use relative path for manifest
  return '/tonconnect-manifest.json';
};