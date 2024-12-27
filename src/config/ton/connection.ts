import { CONNECTION_DEFAULTS } from './constants';
import { getManifestUrl } from './manifest';

export const getConnectionConfig = () => ({
  manifestUrl: getManifestUrl(),
  actionsConfiguration: {
    twaReturnUrl: window.location.origin,
  },
  connectionRestoration: true,
  retryInterval: CONNECTION_DEFAULTS.RETRY_INTERVAL
});