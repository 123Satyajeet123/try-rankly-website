#!/bin/bash

# Fix the ross-default config that's conflicting

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Checking ross-default config..."
echo ""

# Check ross-default
echo "1. ross-default config content:"
sudo cat /etc/nginx/sites-available/ross-default

echo ""
echo "2. Checking if ross-default is enabled:"
ls -la /etc/nginx/sites-enabled/ | grep ross

echo ""
read -p "Press Enter to see the fix options..."

echo ""
echo "3. Options to fix:"
echo "  A) Remove www.tryrankly.com from ross-default"
echo "  B) Disable ross-default entirely (if not needed)"
echo ""

# Backup ross-default
sudo cp /etc/nginx/sites-available/ross-default /etc/nginx/sites-available/ross-default.backup.$(date +%Y%m%d_%H%M%S)

# Remove www.tryrankly.com from ross-default
echo "4. Removing www.tryrankly.com from ross-default..."
sudo sed -i '/server_name.*www\.tryrankly\.com/d' /etc/nginx/sites-available/ross-default
sudo sed -i '/server_name.*tryrankly\.com[^.]/d' /etc/nginx/sites-available/ross-default

# Also remove any server blocks that only have www.tryrankly.com
echo "5. Cleaning up ross-default..."

# Check what's left
echo ""
echo "6. Updated ross-default:"
sudo cat /etc/nginx/sites-available/ross-default

echo ""
echo "7. Testing Nginx..."
if sudo nginx -t 2>&1 | grep -q "conflicting server name.*tryrankly.com"; then
    echo -e "${YELLOW}⚠ Still have conflicts${NC}"
    sudo nginx -t 2>&1 | grep "conflicting"
else
    echo -e "${GREEN}✓ No conflicts!${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx reloaded${NC}"
fi

echo ""
echo "✅ Done! Test with: curl -I https://tryrankly.com"

