export const initialTasks = [
  {
    title: 'Connect Wallet',
    description: 'Connect your TON wallet to start earning rewards',
    reward: 100,
    type: 'onboarding',
    requirements: ['Install TON wallet', 'Connect to platform'],
    isActive: true,
    completionCount: 0,
    startDate: new Date('2024-01-01')
  },
  {
    title: 'Complete Profile',
    description: 'Set up your profile to unlock all features',
    reward: 200,
    type: 'onboarding',
    requirements: ['Set username', 'Add profile picture'],
    isActive: true,
    completionCount: 0,
    startDate: new Date('2024-01-01')
  },
  {
    title: 'Join Telegram',
    description: 'Join our official Telegram community',
    reward: 300,
    type: 'social',
    requirements: ['Join t.me/PAWS_Official', 'Send verification message'],
    isActive: true,
    completionCount: 0,
    startDate: new Date('2024-01-01')
  },
  {
    title: 'Follow Twitter',
    description: 'Follow and engage with PAWS on Twitter',
    reward: 250,
    type: 'social',
    requirements: ['Follow @PAWS_Official', 'Like & Retweet pinned post'],
    isActive: true,
    completionCount: 0,
    startDate: new Date('2024-01-01')
  },
  {
    title: 'First Stake',
    description: 'Stake your first PAWS tokens',
    reward: 1000,
    type: 'defi',
    requirements: ['Stake minimum 100 PAWS', 'Lock for 7 days'],
    isActive: true,
    completionCount: 0,
    startDate: new Date('2024-01-01')
  }
];