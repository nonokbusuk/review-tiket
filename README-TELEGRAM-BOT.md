# ALS Telegram Admin Bot Setup

## 🚀 Setup Instructions

### 1. Create Telegram Bot
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the Bot Token (format: `1234567890:ABCdefGhIjKlMnOpQrStUvWxYz`)

### 2. Get Your Telegram ID
1. Send a message to `@userinfobot`
2. Copy your User ID (numbers only, e.g., `123456789`)

### 3. Environment Variables
Create `.env.local` file in your project root:
```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGhIjKlMnOpQrStUvWxYz
ADMIN_TELEGRAM_IDS=123456789,987654321
```

### 4. Deploy to Vercel
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy your project

### 5. Set Webhook
After deployment, set your webhook URL:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-domain.vercel.app/api/telegram-webhook
```

Replace:
- `<YOUR_BOT_TOKEN>` with your actual bot token
- `your-domain.vercel.app` with your Vercel domain

## 🤖 Bot Commands

### Basic Commands
- `/start` - Show all available commands

### Route Management
- `/addrute Medan Pekanbaru` - Add new route
- `/delrute Medan Pekanbaru` - Delete route
- `/listrutes` - List all routes

### Price Management
- `/setprice Medan Pekanbaru Ekonomi 350000` - Set ticket price
- `/listprices` - List all prices

### Facility Management
- `/setfacility Medan Pekanbaru Executive "AC, Toilet, WiFi"` - Set facilities
- `/listfacilities` - List all facilities

### Settings
- `/setbank BRI 100451242831953 "Lintas Sumatra"` - Set bank account
- `/setwa +6281818657594` - Set WhatsApp admin number
- `/getsettings` - View current settings

### Order Management
- `/listorders` - View recent orders
- `/updatestatus 12345 confirmed` - Update order status
  - Status options: `pending`, `confirmed`, `cancelled`

## 🔄 Real-time Updates

The system automatically:
- Notifies admins when new orders are created
- Updates website data every 30 seconds
- Syncs changes from Telegram bot to website
- Maintains data persistence across deployments

## 🗃️ Data Storage

Data is stored in JSON files in `/tmp` directory:
- `routes.json` - Bus routes
- `prices.json` - Ticket prices
- `facilities.json` - Bus facilities
- `schedules.json` - Bus schedules
- `settings.json` - System settings
- `orders.json` - Customer orders

## 🔐 Security

- Only registered admin Telegram IDs can use commands
- Webhook validates incoming Telegram requests
- CORS headers configured for API endpoints
- Environment variables protect sensitive data

## 📱 Usage Example

1. Admin sends: `/addrute Medan Pekanbaru`
2. Bot confirms: "✅ Rute Medan → Pekanbaru berhasil ditambahkan!"
3. Website automatically shows new route in search form
4. Customer books ticket, admin gets notification
5. Admin confirms: `/updatestatus 1673888888 confirmed`
6. Customer gets updated status on website

## 🛠️ Troubleshooting

### Bot not responding
- Check webhook URL is correctly set
- Verify environment variables in Vercel
- Check Vercel function logs

### Data not updating
- Ensure API endpoints are accessible
- Check CORS configuration
- Verify data file permissions

### Webhook errors
- Check Telegram Bot token is valid
- Ensure webhook URL uses HTTPS
- Verify Vercel function is deployed