#!/bin/bash

# Fix Nginx 404 issue

echo "🔍 Checking Nginx configuration..."

# Check which nginx configs are enabled
echo "1. Active Nginx sites:"
ls -la /etc/nginx/sites-enabled/

echo ""
echo "2. Checking for tryrankly.com config:"
sudo cat /etc/nginx/sites-enabled/tryrankly-website 2>/dev/null || echo "Config not found"

echo ""
echo "3. Checking Nginx config test:"
sudo nginx -t

echo ""
echo "4. Checking what's listening on port 443:"
sudo netstat -tulpn | grep :443

echo ""
echo "5. Checking Nginx error logs:"
sudo tail -20 /var/log/nginx/error.log

echo ""
echo "6. Testing Nginx config for tryrankly.com:"
sudo nginx -T 2>/dev/null | grep -A 20 "server_name tryrankly.com" || echo "No config found for tryrankly.com"

