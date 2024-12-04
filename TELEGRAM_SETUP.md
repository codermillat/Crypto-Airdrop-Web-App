# Telegram Mini App Setup Guide

## 1. Create Bot with BotFather

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Start a chat and use these commands:

```
/newbot - Create a new bot
/setname - Change bot's name
/setdescription - Change bot's description
/setuserpic - Change bot's profile photo
/setcommands - Set bot commands
/mybots - Manage your existing bots
```

## 2. Configure Bot Commands

Send `/setcommands` to BotFather and set these commands:

```
start - Start the bot
help - Show help information
settings - Open settings menu
```

## 3. Create Web App

1. Send `/newapp` to BotFather
2. Select your bot
3. Enter app title and description
4. Upload app icon (512x512 PNG)
5. Enter your app's URL when deployed (e.g., https://your-app.netlify.app)

## 4. Environment Setup

Create a `.env` file with these variables:

```
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_API_URL=http://localhost:3000
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
```

## 5. Configure Web App URL

1. Deploy your app to Netlify or your preferred host
2. Send `/setmenubutton` to BotFather
3. Select your bot
4. Enter the web app URL
5. Set button text (e.g., "Open App")

## 6. Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. For local testing, use Telegram's test environment:
- Open https://t.me/your_bot_username in Chrome
- Use Chrome DevTools device emulation
- Set user agent to include "TelegramWebApp"

## 7. Mini App Configuration

Create `public/tonconnect-manifest.json`: