import React, { useState, useEffect } from 'react';
import { Share2, Loader2, Copy, Users } from 'lucide-react';
import { submitReferral, getReferralCode } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';
import ErrorState from './ErrorState';

const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { address, referralCode: myReferralCode, setReferralCode: setMyReferralCode } = useWalletStore();

  useEffect(() => {
    const fetchReferralCode = async () => {
      if (address && !myReferralCode) {
        setLoading(true);
        try {
          const { code } = await getReferralCode();
          setMyReferralCode(code);
          setError('');
        } catch (err) {
          setError('Failed to load referral code. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReferralCode();
  }, [address, myReferralCode, setMyReferralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !referralCode) return;

    setSubmitting(true);
    setError('');
    
    try {
      await submitReferral(referralCode);
      setReferralCode('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit referral code');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferralLink = async () => {
    if (!myReferralCode) return;
    
    const link = `https://t.me/TonFunZoneBot?start=${myReferralCode}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy link to clipboard');
    }
  };

  if (!address) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">Connect wallet to view your referral stats</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 mb-6 flex justify-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (error && !submitting) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
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
        
        {error && submitting && (
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