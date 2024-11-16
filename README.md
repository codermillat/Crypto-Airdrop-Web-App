# PAWS Crypto Airdrop Platform

A decentralized web application for managing crypto airdrops and rewards using the TON blockchain. Users can complete tasks, earn PAWS tokens, and participate in a referral program.

![PAWS Platform](https://cdn-icons-png.flaticon.com/512/1138/1138485.png)

## Features

- 🔐 **TON Wallet Integration**
  - Secure wallet connection using TonConnect
  - Automatic user registration
  - Real-time balance updates

- 🎯 **Task-based Reward System**
  - Multiple task categories (Onboarding, Social, DeFi, Daily)
  - Automated reward distribution
  - Task completion tracking

- 👥 **Referral Program**
  - Unique referral codes for each user
  - Multi-level rewards system
  - Real-time referral tracking

- 🏆 **Leaderboard**
  - Global ranking system
  - Points-based competition
  - Real-time updates

- 💰 **Daily Rewards**
  - Daily login bonuses
  - Streak rewards
  - Special event rewards

- 👤 **User Profile Management**
  - Username customization
  - Telegram integration
  - Activity tracking

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - TonConnect UI
  - Zustand (State Management)
  - Lucide Icons

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

- **Blockchain**
  - TON Blockchain
  - TonConnect

## Prerequisites

- Node.js 16+
- MongoDB Database
- TON Wallet (TonKeeper recommended)

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/paws_crypto
JWT_SECRET=your_jwt_secret_key
VITE_API_URL=http://localhost:3000/api
URL=http://localhost:5173
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/codermillat/Crypto-Airdrop-Web-App.git
cd Crypto-Airdrop-Web-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing Production Build Locally

To test the production build on your local machine:

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

The production version will be available at `http://localhost:4173`. This allows you to:
- Test the optimized production build
- Verify that all features work as expected
- Check performance optimizations
- Ensure proper environment variable handling

Key differences in production mode:
- Minified and optimized assets
- Disabled development tools and warnings
- Production-specific environment variables
- Improved performance
- Code splitting for better load times
- Optimized chunk sizes for faster initial load

Note: The preview server is for testing purposes only and should not be used for actual production deployment.

## Project Structure

```
├── public/
│   └── tonconnect-manifest.json
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── store/
│   └── utils/
└── package.json
```

## API Routes

### Authentication
- `POST /api/auth/wallet` - Register/authenticate wallet
- `POST /api/auth/register` - Complete user registration

### User
- `GET /api/user` - Get user profile
- `GET /api/user/tasks` - Get available tasks
- `POST /api/user/claim-reward` - Claim task reward

### Data
- `GET /api/data/leaderboard` - Get global leaderboard
- `GET /api/data/referral-code` - Get user's referral code
- `POST /api/data/referral` - Submit referral code

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `POST /api/admin/users/:userId/:action` - Manage users
- `PUT /api/admin/tasks/:taskId` - Manage tasks

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Deployment
The application can be deployed to Netlify:

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy using the following settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All API routes are protected with wallet-based authentication
- Admin routes require special wallet addresses
- Rate limiting is implemented on sensitive endpoints
- CORS is configured for production security

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@pawscrypto.com or join our [Telegram community](https://t.me/PAWS_Official).