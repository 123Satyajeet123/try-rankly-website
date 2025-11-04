#!/bin/bash

# Comprehensive script to fix all Nginx conflicts

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔧 Fixing all Nginx conflicts..."
echo ""

# First, let's see what we have
echo "1. Checking all enabled configs..."
ls -la /etc/nginx/sites-enabled/ | grep -E "rankly|tryrankly"

echo ""
echo "2. Checking for duplicate server blocks..."
echo ""

# Check rankly-temp
echo "Checking rankly-temp:"
sudo grep -c "server_name.*app.tryrankly.com" /etc/nginx/sites-available/rankly-temp || echo "0"

# Check try-rankly-website  
echo "Checking try-rankly-website:"
sudo grep -c "server_name.*tryrankly.com" /etc/nginx/sites-available/try-rankly-website || echo "0"

echo ""
echo "3. Full try-rankly-website config:"
sudo cat /etc/nginx/sites-available/try-rankly-website

echo ""
read -p "Press Enter to continue with fix..."

# Backup
echo "4. Creating backups..."
sudo cp /etc/nginx/sites-available/rankly-temp /etc/nginx/sites-available/rankly-temp.backup.$(date +%Y%m%d_%H%M%S)
sudo cp /etc/nginx/sites-available/try-rankly-website /etc/nginx/sites-available/try-rankly-website.backup.$(date +%Y%m%d_%H%M%S)

# Fix try-rankly-website - ensure it only has tryrankly.com (no app.tryrankly.com)
echo "5. Fixing try-rankly-website config..."
cd ~/sj/try-rankly-website
sudo cp nginx-production.conf /etc/nginx/sites-available/try-rankly-website

# Verify rankly-temp only has app.tryrankly.com
echo "6. Verifying rankly-temp config..."
if sudo grep -q "server_name.*tryrankly.com[^.]" /etc/nginx/sites-available/rankly-temp; then
    echo -e "${RED}ERROR: rankly-temp contains tryrankly.com (without app.)${NC}"
    echo "Fixing it..."
    # Remove any lines with tryrankly.com that don't have app.
    sudo sed -i '/server_name.*tryrankly\.com[^.]/d' /etc/nginx/sites-available/rankly-temp
fi

# Test
echo ""
echo "7. Testing Nginx configuration..."
if sudo nginx -t 2>&1 | grep -q "conflicting server name"; then
    echo -e "${YELLOW}⚠ Still have conflicts. Checking which files...${NC}"
    sudo nginx -T 2>/dev/null | grep -B 5 "server_name.*tryrankly.com" | grep -E "^# configuration file|server_name"
else
    echo -e "${GREEN}✓ No conflicts!${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx reloaded${NC}"
fi

echo ""
echo "✅ Done! Check the output above."

