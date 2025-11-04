#!/bin/bash

# Debug script for 404 errors

echo "🔍 Debugging 404 error on tryrankly.com..."
echo ""

# Check if PM2 is running
echo "1. Checking PM2 status..."
pm2 status

echo ""
echo "2. Checking if app is listening on port 3005..."
sudo netstat -tulpn | grep 3005 || echo "❌ Nothing listening on port 3005"

echo ""
echo "3. Checking PM2 logs..."
pm2 logs rankly-website --lines 20 --nostream

echo ""
echo "4. Testing local connection to port 3005..."
curl -I http://localhost:3005 || echo "❌ Cannot connect to localhost:3005"

echo ""
echo "5. Checking Nginx configuration..."
sudo nginx -t

echo ""
echo "6. Checking active Nginx sites..."
ls -la /etc/nginx/sites-enabled/

echo ""
echo "7. Checking Nginx error logs (last 20 lines)..."
sudo tail -20 /var/log/nginx/error.log

echo ""
echo "8. Checking Nginx access logs..."
sudo tail -10 /var/log/nginx/access.log

echo ""
echo "✅ Debug complete. Check the output above for issues."

