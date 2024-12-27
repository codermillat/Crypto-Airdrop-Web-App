import { CONNECTION_CONFIG } from './constants';

export const getActionsConfig = () => ({
  twaReturnUrl: CONNECTION_CONFIG.returnUrl
});