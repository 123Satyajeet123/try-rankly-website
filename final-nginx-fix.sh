#!/bin/bash

# Final fix for Nginx conflicts - find and fix ALL duplicate server blocks

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Finding ALL configs with tryrankly.com domains..."
echo ""

# Find ALL occurrences
echo "1. All configs with 'tryrankly.com' (anywhere):"
grep -r "tryrankly.com" /etc/nginx/sites-enabled/ 2>/dev/null | grep -v "^Binary" | while read line; do
    echo "  $line"
done

echo ""
echo "2. Counting server blocks in each file:"
echo "  rankly-temp server blocks:"
sudo grep -c "^server {" /etc/nginx/sites-available/rankly-temp || echo "0"
echo "  try-rankly-website server blocks:"
sudo grep -c "^server {" /etc/nginx/sites-available/try-rankly-website || echo "0"

echo ""
echo "3. Full try-rankly-website file content:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/try-rankly-website

echo ""
echo "4. Checking if there are other files with these domains:"
find /etc/nginx/sites-available/ -name "*rankly*" -o -name "*tryrankly*" 2>/dev/null

echo ""
echo "5. Checking what Nginx actually sees:"
sudo nginx -T 2>/dev/null | grep -B 10 "server_name.*tryrankly.com" | head -30

