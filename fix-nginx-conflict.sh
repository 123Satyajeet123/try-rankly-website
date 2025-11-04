#!/bin/bash

# Fix Nginx server name conflicts

echo "🔍 Checking for conflicting Nginx configurations..."

# Find all configs with tryrankly.com
echo "1. Configs containing tryrankly.com:"
grep -r "server_name.*tryrankly.com" /etc/nginx/sites-enabled/ 2>/dev/null

echo ""
echo "2. Configs containing app.tryrankly.com:"
grep -r "server_name.*app.tryrankly.com" /etc/nginx/sites-enabled/ 2>/dev/null

echo ""
echo "3. Checking rankly-temp config:"
if [ -f /etc/nginx/sites-enabled/rankly-temp ]; then
    echo "rankly-temp config content:"
    sudo cat /etc/nginx/sites-enabled/rankly-temp | grep -A 5 "server_name"
fi

echo ""
echo "4. Checking try-rankly-website config:"
if [ -f /etc/nginx/sites-enabled/try-rankly-website ]; then
    echo "try-rankly-website config content:"
    sudo cat /etc/nginx/sites-enabled/try-rankly-website | grep -A 5 "server_name"
fi

