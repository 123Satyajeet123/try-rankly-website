#!/bin/bash

# Find and fix all Nginx server name conflicts

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Finding all Nginx configs with tryrankly.com domains..."
echo ""

# Find all configs with tryrankly.com
echo "1. All configs containing 'tryrankly.com':"
echo "----------------------------------------"
grep -r "server_name.*tryrankly.com" /etc/nginx/sites-enabled/ 2>/dev/null | while read line; do
    FILE=$(echo "$line" | cut -d: -f1)
    CONTENT=$(echo "$line" | cut -d: -f2-)
    echo "File: $FILE"
    echo "  Content: $CONTENT"
    echo ""
done

echo ""
echo "2. All configs containing 'app.tryrankly.com':"
echo "----------------------------------------"
grep -r "server_name.*app.tryrankly.com" /etc/nginx/sites-enabled/ 2>/dev/null | while read line; do
    FILE=$(echo "$line" | cut -d: -f1)
    CONTENT=$(echo "$line" | cut -d: -f2-)
    echo "File: $FILE"
    echo "  Content: $CONTENT"
    echo ""
done

echo ""
echo "3. Checking which configs are loaded first (alphabetical order matters!):"
echo "----------------------------------------"
ls -1 /etc/nginx/sites-enabled/ | sort

echo ""
echo "4. Full content of rankly-temp:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/rankly-temp | grep -A 2 "server_name"

echo ""
echo "5. Full content of try-rankly-website:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/try-rankly-website | grep -A 2 "server_name"

echo ""
echo "6. Checking for other configs in sites-available:"
echo "----------------------------------------"
grep -r "tryrankly.com\|app.tryrankly.com" /etc/nginx/sites-available/ 2>/dev/null | grep -v ".backup" || echo "No other configs found"

