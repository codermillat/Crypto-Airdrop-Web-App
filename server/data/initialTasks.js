export const initialTasks = [
  {
    title: 'Connect Wallet',
    description: 'Connect your TON wallet to start earning rewards',
    reward: 100,
    type: 'onboarding',
    requirements: ['Install TON wallet', 'Connect to platform'],
    isActive: true,
    completionCount: 0,
    startDate: new Date()
  },
  {
    title: 'Complete Profile',
    description: 'Set up your profile with Telegram',
    reward: 200,
    type: 'onboarding',
    requirements: ['Connect Telegram', 'Set username'],
    isActive: true,
    completionCount: 0,
    startDate: new Date()
  },
  {
    title: 'Join Community',
    description: 'Join our Telegram community',
    reward: 300,
    type: 'social',
    requirements: ['Join t.me/PAWS_Official'],
    isActive: true,
    completionCount: 0,
    startDate: new Date()
  }
];