#!/bin/bash

# Debug and fix Nginx configuration

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Debugging Nginx configuration..."
echo ""

# 1. Show what Nginx sees for tryrankly.com
echo "1. What Nginx sees for tryrankly.com on port 443:"
sudo nginx -T 2>/dev/null | grep -A 20 "server_name.*tryrankly.com" | grep -B 5 -A 15 "listen.*443" | head -40

echo ""
echo "2. What Nginx sees for app.tryrankly.com on port 443:"
sudo nginx -T 2>/dev/null | grep -A 20 "server_name.*app.tryrankly.com" | grep -B 5 -A 15 "listen.*443" | head -40

echo ""
echo "3. Checking which config loads first (alphabetical order):"
ls -1 /etc/nginx/sites-enabled/ | grep -E "rankly|tryrankly" | sort

echo ""
echo "4. Full content of try-rankly-website:"
sudo cat /etc/nginx/sites-available/try-rankly-website

echo ""
read -p "Press Enter to see the fix..."

# The issue: Nginx loads configs alphabetically
# rankly-temp loads before try-rankly-website
# We need to ensure try-rankly-website loads first OR fix the actual configs

echo ""
echo "5. Applying fix..."
echo ""

# Backup
sudo cp /etc/nginx/sites-available/try-rankly-website /etc/nginx/sites-available/try-rankly-website.backup.$(date +%Y%m%d_%H%M%S)

# Copy clean config
cd ~/sj/try-rankly-website
sudo cp nginx-production.conf /etc/nginx/sites-available/try-rankly-website

# Rename to load first (alphabetically)
echo "6. Renaming configs to control load order..."
sudo rm /etc/nginx/sites-enabled/rankly-temp
sudo rm /etc/nginx/sites-enabled/try-rankly-website

# Create new symlinks with proper order
sudo ln -s /etc/nginx/sites-available/rankly-temp /etc/nginx/sites-enabled/01-rankly-temp
sudo ln -s /etc/nginx/sites-available/try-rankly-website /etc/nginx/sites-enabled/00-try-rankly-website

echo "7. Testing..."
if sudo nginx -t 2>&1 | grep -q "conflicting server name"; then
    echo -e "${YELLOW}⚠ Still have conflicts${NC}"
    sudo nginx -t
else
    echo -e "${GREEN}✓ No conflicts!${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx reloaded${NC}"
fi

echo ""
echo "✅ Done! Test with:"
echo "  curl -I https://tryrankly.com"
echo "  curl -I https://app.tryrankly.com"

