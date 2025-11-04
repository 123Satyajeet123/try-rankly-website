#!/bin/bash

# Script to fix Nginx configs for app.tryrankly.com and tryrankly.com

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔧 Fixing Nginx configurations to avoid conflicts..."
echo ""

# Backup existing configs
echo "1. Backing up existing configs..."
sudo cp /etc/nginx/sites-available/rankly-temp /etc/nginx/sites-available/rankly-temp.backup 2>/dev/null || echo "No rankly-temp to backup"
sudo cp /etc/nginx/sites-available/try-rankly-website /etc/nginx/sites-available/try-rankly-website.backup 2>/dev/null || echo "No try-rankly-website to backup"

echo ""
echo "2. Current rankly-temp config (for app.tryrankly.com):"
if [ -f /etc/nginx/sites-available/rankly-temp ]; then
    echo "---"
    sudo cat /etc/nginx/sites-available/rankly-temp
    echo "---"
else
    echo "rankly-temp config not found"
fi

echo ""
echo "3. Current try-rankly-website config:"
if [ -f /etc/nginx/sites-available/try-rankly-website ]; then
    echo "---"
    sudo cat /etc/nginx/sites-available/try-rankly-website
    echo "---"
else
    echo "try-rankly-website config not found"
fi

echo ""
echo "✅ Please review the configs above"
echo "Run the fix script after reviewing"

