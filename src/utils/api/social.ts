import api from './client';

export const fetchLeaderboard = async () => {
  const response = await api.get('/data/leaderboard');
  return response.data;
};

export const fetchReferrals = async () => {
  const response = await api.get('/user/referrals');
  return response.data;
};

export const getReferralCode = async () => {
  const response = await api.get('/user/referral-code');
  return response.data;
};

export const submitReferral = async (referralCode: string) => {
  const response = await api.post('/user/referral', { referralCode });
  return response.data;
};