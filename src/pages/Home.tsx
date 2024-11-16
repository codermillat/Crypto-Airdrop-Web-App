import { useEffect, useState } from 'react';
import { PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';
import UsernameModal from '../components/UsernameModal';
import { useWalletStore } from '../store/useWalletStore';
import { useTonConnect } from '../hooks/useTonConnect';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const { 
    points, 
    username,
    isRegistered
  } = useWalletStore();
  const { connected, address } = useTonConnect();
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (connected && address && !isRegistered) {
      setShowUsernameModal(true);
    }
  }, [connected, address, isRegistered]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">PAWS</h1>
        <div className="flex items-center space-x-2">
          {username && <span className="text-blue-500">@{username}</span>}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 text-center mb-6">
        <PawPrint className="w-16 h-16 mx-auto mb-4 text-white" />
        <div className="mb-4">
          <ErrorBoundary>
            <WalletConnect />
          </ErrorBoundary>
        </div>
        {connected && address && (
          <div className="mt-4">
            <div className="text-xl font-bold text-blue-500">{points} PAWS</div>
            <div className="text-gray-400">Current Balance</div>
          </div>
        )}
        <div className="text-gray-400 mt-2">
          {points >= 10000 ? 'EXPERT' : points >= 5000 ? 'ADVANCED' : 'NEWCOMER'} RANK
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => navigate('/tasks')}
          className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
        >
          <span>Complete tasks</span>
          <span>→</span>
        </button>
        <button 
          onClick={() => navigate('/friends')}
          className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
        >
          <span>Invite friends</span>
          <span>→</span>
        </button>
      </div>

      <UsernameModal 
        isOpen={showUsernameModal} 
        onClose={() => setShowUsernameModal(false)} 
      />
    </div>
  );
};

export default Home;