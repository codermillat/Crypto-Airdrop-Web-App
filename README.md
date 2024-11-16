# PAWS Crypto Airdrop Platform - Deployment Guide

This guide explains how to deploy the PAWS Crypto Airdrop platform using Netlify (frontend), Render (backend), and MongoDB Atlas (database).

## Architecture Overview

The application is split into:
- Frontend: React + Vite application
- Backend: Node.js + Express API server
- Database: MongoDB Atlas

## Prerequisites

1. Accounts needed:
   - [Netlify Account](https://app.netlify.com/signup)
   - [Render Account](https://render.com)
   - [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register)

2. Required tools:
   - Node.js 16+
   - Git

## Step 1: MongoDB Atlas Setup

1. Create a new project in MongoDB Atlas:
   ```
   a. Log in to MongoDB Atlas
   b. Create New Project → Name it "paws-crypto"
   c. Build a Database → Choose FREE tier
   d. Select region closest to your users
   e. Create Cluster
   ```

2. Set up database access:
   ```
   a. Go to Database Access → Add New Database User
   b. Choose Password Authentication
   c. Create a username and secure password
   d. Set privileges to "Read and write to any database"
   e. Add User
   ```

3. Configure network access:
   ```
   a. Go to Network Access → Add IP Address
   b. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   c. Confirm
   ```

4. Get connection string:
   ```
   a. Go to Database → Connect → Connect your application
   b. Copy the connection string
   c. Replace <password> with your database user's password
   ```

## Step 2: Render Backend Deployment

1. Create new Web Service:
   ```
   a. Go to Render Dashboard
   b. Click "New +" → Web Service
   c. Connect your GitHub repository
   ```

2. Configure the service:
   ```
   Name: paws-crypto-api
   Region: Choose closest to your users
   Branch: main
   Root Directory: ./
   Runtime: Node
   Build Command: npm install
   Start Command: node server/index.js
   ```

3. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   URL=https://your-netlify-app-name.netlify.app
   PORT=10000
   NODE_ENV=production
   ```

4. Deploy the service and note the URL (e.g., https://paws-crypto-api.onrender.com)

## Step 3: Netlify Frontend Deployment

1. Update frontend configuration:
   ```
   a. Create .env.production in project root:
   VITE_API_URL=https://your-render-api-url/api
   ```

2. Configure Netlify deployment:
   ```
   a. Go to Netlify Dashboard
   b. Add new site → Import from Git
   c. Connect to your repository
   ```

3. Configure build settings:
   ```
   Base directory: ./
   Build command: npm run build
   Publish directory: dist
   ```

4. Add environment variables:
   ```
   VITE_API_URL=https://your-render-api-url/api
   ```

5. Deploy site and note the URL (e.g., https://paws-crypto.netlify.app)

## Step 4: CORS Configuration

Update server/index.js to allow your Netlify domain:

```javascript
const FRONTEND_URL = process.env.URL || 'http://localhost:5173';

app.use(cors({
  origin: [
    FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:4173',
    'https://your-netlify-app-name.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-wallet-address']
}));
```

## Step 5: Update TON Connect Configuration

1. Update public/tonconnect-manifest.json:
```json
{
  "url": "https://your-netlify-app-name.netlify.app",
  "name": "PAWS Crypto",
  "iconUrl": "https://cdn-icons-png.flaticon.com/512/1138/1138485.png",
  "termsOfUseUrl": "https://your-netlify-app-name.netlify.app/terms",
  "privacyPolicyUrl": "https://your-netlify-app-name.netlify.app/privacy"
}
```

## Troubleshooting

### Common Issues

1. CORS Errors:
   ```
   - Verify CORS configuration in server/index.js
   - Check if frontend URL matches CORS allowed origins
   - Ensure all request headers are properly allowed
   ```

2. MongoDB Connection Issues:
   ```
   - Verify MongoDB Atlas connection string
   - Check if IP whitelist includes Render's IPs
   - Ensure database user credentials are correct
   ```

3. API Connection Issues:
   ```
   - Verify VITE_API_URL in frontend environment
   - Check if Render service is running
   - Ensure API endpoints are properly formatted
   ```

### Deployment Checklist

- [ ] MongoDB Atlas cluster is created and configured
- [ ] Database user is created with proper permissions
- [ ] Network access is configured in MongoDB Atlas
- [ ] Backend is deployed to Render with correct environment variables
- [ ] Frontend is deployed to Netlify with correct environment variables
- [ ] CORS is configured to allow Netlify domain
- [ ] TON Connect manifest is updated with production URLs
- [ ] All API endpoints are working in production
- [ ] Wallet connection works in production
- [ ] Database operations are successful

## Monitoring and Maintenance

1. Monitor application:
   ```
   - Use Render dashboard for backend logs
   - Check Netlify deploy logs for frontend issues
   - Monitor MongoDB Atlas metrics
   ```

2. Regular maintenance:
   ```
   - Keep dependencies updated
   - Monitor database performance
   - Check error logs regularly
   - Backup database periodically
   ```

## Security Considerations

1. Environment Variables:
   ```
   - Use strong JWT secret
   - Rotate database credentials periodically
   - Keep environment variables secure
   ```

2. Database Security:
   ```
   - Regular security patches
   - Monitor database access
   - Implement proper authentication
   ```

3. API Security:
   ```
   - Rate limiting
   - Input validation
   - Secure headers
   ```

## Support

For deployment issues:
1. Check the troubleshooting guide above
2. Review service-specific logs
3. Contact support:
   - Netlify: support@netlify.com
   - Render: support@render.com
   - MongoDB Atlas: https://support.mongodb.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.