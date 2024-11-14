import React, { useState } from 'react';
import { Share2, Loader2 } from 'lucide-react';
import { submitReferral } from '../utils/api';
import { useWalletStore } from '../store/useWalletStore';

const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { address } = useWalletStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !referralCode) return;

    setSubmitting(true);
    setError('');
    
    try {
      await submitReferral(referralCode);
      setReferralCode('');
      // Show success message or update UI
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit referral code');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-2">SHARE YOUR INVITATION LINK &</h2>
      <h3 className="text-xl text-blue-500 mb-6">GET 10% OF FRIEND'S POINTS</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Enter referral code"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!address || submitting}
        />
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          disabled={!address || !referralCode || submitting}
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
      
      <div className="mt-4 text-center text-gray-400">
        <p>Connect wallet to view your referral stats</p>
      </div>
    </div>
  );
};

export default ReferralSystem;