# 🎯 Dynamic Campaign Admin Panel

A Vue 3 + TypeScript admin panel for managing dynamic marketing campaigns across client websites.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_R2_PUBLIC_URL=https://pub-YOUR-BUCKET-ID.r2.dev
VITE_SITE_NAME=Your Client Name
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:5173

### 4. Build for Production
```bash
npm run build
```

## 📦 Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account
- R2 bucket created with public access enabled
- Cloudflare Access configured (optional but recommended)

### Deploy Steps

1. **Connect to GitHub/GitLab** or use direct upload
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Environment variables:**
   - Add `VITE_R2_PUBLIC_URL` and `VITE_SITE_NAME`
4. **R2 Bucket Binding:**
   - Go to Settings → Functions → R2 bucket bindings
   - Variable name: `CAMPAIGN_BUCKET`
   - Bucket: `your-bucket-name`

## 🎨 Features

- ✅ **Announcement Bar** - Top scrolling banner
- ✅ **Promo Card** - Floating promotional card
- ✅ **Hero Banner** - Full-width image banners with scheduling
- ✅ **Live Preview** - See changes in real-time
- ✅ **Date Scheduling** - Auto-enable/disable campaigns
- ✅ **Color Customization** - Full style control
- ✅ **Image Upload** - Direct to R2 storage
- ✅ **JSON Export** - Download config for backup

## 📁 Project Structure

```
dynamic-campaign-system/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── router/          # Vue Router config
│   ├── App.vue          # Root component
│   ├── main.ts          # Entry point
│   └── style.css        # Global styles
├── functions/
│   └── api/             # Cloudflare Pages Functions
│       ├── config.ts    # Config read/write API
│       └── upload.ts    # Image upload API
├── .env.example         # Environment template
├── wrangler.toml        # Cloudflare config
└── package.json
```

## 🔧 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Vue Router** - Client-side routing
- **Cloudflare Pages** - Hosting
- **Cloudflare R2** - Object storage
- **Cloudflare Access** - Authentication

## 📝 License

MIT
