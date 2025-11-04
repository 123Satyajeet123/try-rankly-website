#!/bin/bash

# Script to update Nginx configs: rankly-temp for app.tryrankly.com, try-rankly-website for tryrankly.com

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔧 Updating Nginx configurations to avoid conflicts..."
echo ""

# Create updated rankly-temp config (app.tryrankly.com only)
echo "1. Creating updated rankly-temp config for app.tryrankly.com only..."

sudo tee /etc/nginx/sites-available/rankly-temp > /dev/null << 'EOF'
# Production Nginx Config for app.tryrankly.com
# This handles the main application (app.tryrankly.com)

server {
    server_name app.tryrankly.com www.app.tryrankly.com;

    # Maximum upload size
    client_max_body_size 10M;

    # Timeouts - Increased significantly for LLM operations (can take 5+ minutes)
    proxy_connect_timeout 300s;  # 5 minutes - connection timeout
    proxy_send_timeout 600s;     # 10 minutes - send timeout (for large request bodies)
    proxy_read_timeout 600s;     # 10 minutes - read timeout (for long-running LLM calls)

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        
        # CRITICAL: Pass Authorization header explicitly
        proxy_set_header Authorization $http_authorization;
        
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Disable redirect following
        proxy_redirect off;
    }   
        
    # Frontend Next.js App
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        
        # WebSocket support for Next.js
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Next.js specific settings
        proxy_redirect off;
        proxy_buffering off;
    }   

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tryrankly.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tryrankly.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.app.tryrankly.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = app.tryrankly.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name app.tryrankly.com www.app.tryrankly.com;
    return 404; # managed by Certbot
}
EOF

echo -e "${GREEN}✓ Updated rankly-temp config (app.tryrankly.com only)${NC}"

# Update try-rankly-website config (tryrankly.com and www.tryrankly.com only)
echo ""
echo "2. Ensuring try-rankly-website config handles tryrankly.com and www.tryrankly.com only..."

# The config should already be correct, but let's verify
cd ~/sj/try-rankly-website
sudo cp nginx-production.conf /etc/nginx/sites-available/try-rankly-website

echo -e "${GREEN}✓ Updated try-rankly-website config (tryrankly.com and www.tryrankly.com only)${NC}"

# Ensure both are enabled
echo ""
echo "3. Ensuring both configs are enabled..."
sudo ln -sf /etc/nginx/sites-available/rankly-temp /etc/nginx/sites-enabled/rankly-temp
sudo ln -sf /etc/nginx/sites-available/try-rankly-website /etc/nginx/sites-enabled/try-rankly-website

echo -e "${GREEN}✓ Both configs enabled${NC}"

# Test configuration
echo ""
echo "4. Testing Nginx configuration..."
if sudo nginx -t; then
    echo -e "${GREEN}✓ Nginx configuration test passed${NC}"
    
    echo ""
    echo "5. Reloading Nginx..."
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx reloaded${NC}"
    
    echo ""
    echo "6. Verifying no conflicts..."
    CONFLICTS=$(sudo nginx -T 2>/dev/null | grep -c "conflicting server name" || echo "0")
    if [ "$CONFLICTS" -eq "0" ]; then
        echo -e "${GREEN}✓ No conflicts detected${NC}"
    else
        echo -e "${YELLOW}⚠ Still some conflicts, but they may be warnings${NC}"
        sudo nginx -t 2>&1 | grep "conflicting" || true
    fi
    
    echo ""
    echo "✅ Configuration update complete!"
    echo ""
    echo "Summary:"
    echo "  - app.tryrankly.com → handled by rankly-temp (port 3000 frontend, 5000 backend)"
    echo "  - tryrankly.com → handled by try-rankly-website (port 3005)"
    echo "  - www.tryrankly.com → handled by try-rankly-website (port 3005)"
    echo ""
    echo "Test with:"
    echo "  curl -I https://tryrankly.com"
    echo "  curl -I https://app.tryrankly.com"
else
    echo -e "${RED}✗ Nginx configuration test failed${NC}"
    exit 1
fi

