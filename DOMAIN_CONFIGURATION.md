# Domain Configuration Guide

## Issue: Domain Changes When Pasting URLs

When you copy and paste your website URL into platforms like Hacker News or WhatsApp, the domain might change to `rankly.ai` instead of your actual domain. This happens because the Open Graph metadata and canonical URLs are pointing to the wrong domain.

## Solution

### 1. Set Environment Variable (REQUIRED)

**Create or update your `.env.local` file** (for development) and `.env` file (for production):

```bash
NEXT_PUBLIC_SITE_URL=https://tryrankly.com
```

**Replace `tryrankly.com` with your actual domain.**

### 2. Update Production Environment

On your production server, set the environment variable:

```bash
# In your .env file on the server
NEXT_PUBLIC_SITE_URL=https://tryrankly.com
```

Or if using PM2:

```bash
# In ecosystem.config.js or when starting PM2
NEXT_PUBLIC_SITE_URL=https://tryrankly.com pm2 start ecosystem.config.js
```

### 3. Restart Your Application

After setting the environment variable:

```bash
# Restart PM2
pm2 restart rankly-website

# Or if running directly
npm run build
npm start
```

## Why This Happens

1. **Open Graph Metadata**: Platforms like Hacker News and WhatsApp fetch Open Graph tags (`og:url`) to determine what domain to display
2. **Canonical URLs**: The canonical URL in your metadata tells search engines and platforms what the "official" URL is
3. **metadataBase**: Next.js uses `metadataBase` to resolve relative URLs in metadata

If `NEXT_PUBLIC_SITE_URL` is not set, the code defaults to `tryrankly.com` (updated from `rankly.ai`), but you should **always set it explicitly** to match your actual domain.

## Verification

After setting the environment variable, verify:

1. **Check Open Graph tags**:
   ```bash
   curl https://your-domain.com | grep -i "og:url"
   ```
   Should show: `<meta property="og:url" content="https://your-domain.com/..." />`

2. **Test on Hacker News/WhatsApp**:
   - Copy your URL
   - Paste it into Hacker News or WhatsApp
   - The domain should now show your actual domain, not `rankly.ai`

3. **Check canonical URL**:
   ```bash
   curl https://your-domain.com | grep -i "canonical"
   ```
   Should show: `<link rel="canonical" href="https://your-domain.com/..." />`

## Files Updated

The following files have been updated to use `tryrankly.com` as the default (instead of `rankly.ai`):

- `app/layout.tsx` - Main metadata configuration
- `app/sitemap.ts` - Sitemap URLs
- `app/blogs/what-is-aeo/page.tsx` - Blog post metadata
- `components/ui/faq-section-2.tsx` - FAQ schema
- `public/robots.txt` - Sitemap reference

**Important**: Even though defaults are updated, you should **always set `NEXT_PUBLIC_SITE_URL`** to your actual domain to ensure consistency across all environments.

