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

This section details the steps to deploy the backend API of the PAWS Crypto Airdrop platform on Render.

1. **Create a New Web Service:**
   - Log in to your Render account.
   - Navigate to your dashboard and click on **New +**, then select **Web Service**.
   - Connect your GitHub, GitLab, Bitbucket, or Azure DevOps repository where your backend code is hosted.

2. **Configure the Service:**
   - **Name:** Choose a name for your backend service (e.g., `paws-crypto-api`).
   - **Region:** Select the region closest to your target users for better latency.
   - **Branch:** Set the branch to `main` (or your main development branch).
   - **Root Directory:** Specify the root directory of your backend code (`./`).
   - **Runtime:** Choose **Node**.
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`

3. **Add Environment Variables:**
   - In the Render dashboard for your web service, go to the **Environment** section.
   - Add the following environment variables. Replace the placeholder values with your actual configuration:
     - `MONGODB_URI`: Your MongoDB Atlas connection string.
     - `JWT_SECRET`: A secure secret key for JWT signing.
     - `URL`: The URL of your Netlify frontend (e.g., `https://your-app-name.netlify.app`). This is used for CORS configuration.
     - `PORT`: Set this to `10000`.
     - `NODE_ENV`: Set this to `production`.

4. **Deploy the Service:**
   - Save your configuration. Render will automatically start the deployment process.
   - Once deployed, your backend API will be accessible at a `onrender.com` URL (e.g., `https://paws-crypto-api.onrender.com`). Make a note of this URL, as you'll need it to configure the frontend.

## Step 3: Netlify Frontend Deployment

This section outlines the steps to deploy the frontend of the PAWS Crypto Airdrop platform on Netlify.

1. **Update Frontend Configuration:**
   Create a `.env.production` file in the root of your project and add the following environment variable, replacing `https://your-render-api-url/api` with the actual URL of your deployed Render backend:
   ```
   VITE_API_URL=https://your-render-api-url/api
   ```

2. **Configure Netlify Deployment:**
   - Log in to your Netlify account.
   - Click **Add new site** and select **Import from Git**.
   - Connect to your GitHub, GitLab, Bitbucket, or Azure DevOps repository.
   - Pick the repository for your PAWS Crypto Airdrop project.

3. **Configure Build Settings:**
   - **Base directory:**  Ensure this is set to the root of your repository (`./`).
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **Add Environment Variables:**
   - In the Netlify dashboard for your site, go to **Site settings** -> **Environment** -> **Environment variables**.
   - Add the `VITE_API_URL` environment variable, using the URL of your deployed Render backend as the value.

5. **Deploy Your Site:**
   - Once the build settings and environment variables are configured, Netlify will automatically start the deployment process.
   - After deployment, your site will be available at a `netlify.app` URL (e.g., `https://your-app-name.netlify.app`). Note this URL, as you'll need it for the backend CORS configuration and the TonConnect manifest.

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

## Production .env File

Create a `.env` file in the root of your project for production environment variables. This file should include the following variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

- `MONGODB_URI`: Replace `your_mongodb_atlas_connection_string` with the actual connection string from your MongoDB Atlas setup.
- `JWT_SECRET`: Replace `your_secure_jwt_secret` with a strong, randomly generated secret key for signing JWTs.

**Note:** Ensure this file is added to your `.gitignore` to prevent sensitive information from being committed to your repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
