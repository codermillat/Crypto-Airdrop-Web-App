import React, { useState, useEffect } from 'react';
import { Share2, Loader2, Copy } from 'lucide-react';
import { submitReferral } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';
import api from '../utils/api';

const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { address, username, referralCode: myReferralCode, setReferralCode: setMyReferralCode } = useWalletStore();

  useEffect(() => {
    const fetchReferralCode = async () => {
      if (address && !myReferralCode) {
        try {
          const response = await api.get('/referral-code');
          setMyReferralCode(response.data.code);
        } catch (err) {
          console.error('Failed to fetch referral code:', err);
        }
      }
    };

    fetchReferralCode();
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !referralCode) return;

    setSubmitting(true);
    setError('');
    
    try {
      await submitReferral(referralCode);
      setReferralCode('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit referral code');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferralLink = async () => {
    if (!myReferralCode) return;
    
    const link = `https://t.me/TonFunZoneBot?start=${myReferralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!address) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
        <p className="text-gray-400">Connect wallet to view your referral stats</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-2">SHARE YOUR INVITATION LINK &</h2>
      <h3 className="text-xl text-blue-500 mb-6">GET 10% OF FRIEND'S POINTS</h3>
      
      {myReferralCode && (
        <div className="mb-6">
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2">
            <span className="font-mono">{myReferralCode}</span>
            <button
              onClick={copyReferralLink}
              className="text-blue-500 hover:text-blue-400"
            >
              {copied ? (
                <span className="text-green-500">Copied!</span>
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Share this code with friends to earn rewards
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Enter referral code"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          disabled={!referralCode || submitting}
        >
          {submitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Share2 size={20} />
              <span>Submit Referral</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReferralSystem;