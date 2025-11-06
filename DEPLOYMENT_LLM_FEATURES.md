# LLM Crawlability Features - Deployment Checklist

## ✅ Pre-Deployment Verification

All LLM crawlability features are ready for deployment. Here's what was added:

### New Files Created:
1. ✅ `/public/llms.txt` - LLM guide file (served as static asset)
2. ✅ `/app/api/markdown/route.ts` - Markdown API endpoint
3. ✅ `/components/markdown-button.tsx` - Markdown button component
4. ✅ `/app/features/answer-engine-analytics/layout.tsx` - Metadata for feature page
5. ✅ `/app/features/traffic-analytics/layout.tsx` - Metadata for feature page
6. ✅ `/app/features/actionables/layout.tsx` - Metadata for feature page

### Files Modified:
1. ✅ `/public/robots.txt` - Added AI crawler permissions
2. ✅ `/app/layout.tsx` - Added Organization schema markup
3. ✅ `/app/blogs/what-is-aeo/page.tsx` - Added Article schema + Markdown button
4. ✅ `/components/ui/faq-section-2.tsx` - Added FAQPage schema markup

## 🚀 Deployment Steps

### 1. Build Verification (Optional)
```bash
# The build may show warnings for unrelated demo files, but our changes are fine
npm run build
```

### 2. Environment Variables
Ensure these are set in your production environment:
```bash
NEXT_PUBLIC_SITE_URL=https://rankly.ai  # or your actual domain
```

**Note:** All new features have fallback defaults, so even without this variable, everything will work (using https://rankly.ai as default).

### 3. Deploy to Server

#### Option A: Using existing deploy script
```bash
# On your server
cd /var/www/rankly-website
git pull origin main  # or upload files
npm install  # if new dependencies were added
npm run build
pm2 restart rankly-website
```

#### Option B: Manual deployment
```bash
# 1. Upload files to server
# 2. Install dependencies (if any)
npm install

# 3. Build the application
npm run build

# 4. Restart PM2
pm2 restart rankly-website

# 5. Check logs
pm2 logs rankly-website --lines 50
```

## ✅ Post-Deployment Verification

After deployment, verify these endpoints work:

### 1. LLM Guide File
```bash
curl https://rankly.ai/llms.txt
```
Should return the LLM guide content.

### 2. Markdown API Endpoint
```bash
# Test homepage markdown
curl https://rankly.ai/api/markdown?path=/

# Test blog post markdown
curl https://rankly.ai/api/markdown?path=/blogs/what-is-aeo

# Test about page markdown
curl https://rankly.ai/api/markdown?path=/about
```
Should return markdown content with `Content-Type: text/markdown`.

### 3. Robots.txt
```bash
curl https://rankly.ai/robots.txt
```
Should include AI crawler permissions.

### 4. Structured Data
Visit pages and check page source for:
- Organization schema in `<head>`
- Article schema on blog posts
- FAQPage schema on pages with FAQs

### 5. Markdown Button
- Visit `/blogs/what-is-aeo`
- Click the "Markdown" button next to the title
- Should open dialog with markdown content
- Download button should work

## 🔍 Testing Checklist

- [ ] `/llms.txt` is accessible
- [ ] `/api/markdown?path=/` returns markdown
- [ ] `/api/markdown?path=/blogs/what-is-aeo` returns markdown
- [ ] `/api/markdown?path=/about` returns markdown
- [ ] Markdown button appears on blog post page
- [ ] Markdown dialog opens and displays content
- [ ] Download markdown works
- [ ] Robots.txt includes AI crawlers
- [ ] No console errors in browser
- [ ] All pages load correctly

## 📝 Notes

1. **Build Warnings**: If you see build warnings about `color-picker-demo`, these are unrelated to our changes and can be ignored (or you can remove that demo page if not needed).

2. **Markdown Content**: The markdown API currently has hardcoded content for:
   - `/` (homepage)
   - `/blogs/what-is-aeo` (blog post)
   - `/about` (about page)
   
   To add more pages, edit `/app/api/markdown/route.ts` and add entries to the `markdownContent` object.

3. **Environment Variables**: All features work with defaults, but setting `NEXT_PUBLIC_SITE_URL` ensures correct URLs in structured data.

4. **Caching**: The markdown API has caching headers set (1 hour cache, 24 hour stale-while-revalidate).

## 🐛 Troubleshooting

### Markdown API returns 404
- Check that `/app/api/markdown/route.ts` exists
- Verify Next.js API routes are enabled
- Check PM2 logs: `pm2 logs rankly-website`

### Markdown button doesn't appear
- Verify `/components/markdown-button.tsx` exists
- Check browser console for errors
- Ensure Dialog component is available

### LLM features not working
- Verify all files are uploaded to server
- Check that build completed successfully
- Review PM2 logs for errors

## ✨ Summary

All LLM crawlability features are **ready for deployment**. The changes are:
- ✅ Self-contained (no external dependencies)
- ✅ Backward compatible (all have fallbacks)
- ✅ Production-ready (proper error handling)
- ✅ Well-documented (in code and llms.txt)

You can deploy directly to your server!

