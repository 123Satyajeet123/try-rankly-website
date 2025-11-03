#!/bin/bash

# Script to setup Nginx with existing SSL certificates for tryrankly.com

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOMAIN="tryrankly.com"
NGINX_SITE="tryrankly-website"
CERT_PATH="/etc/letsencrypt/live/tryrankly.com"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

echo -e "${YELLOW}Setting up Nginx with existing SSL certificates...${NC}"

# Verify certificates exist
if [ ! -f "$CERT_PATH/fullchain.pem" ]; then
    echo -e "${RED}Error: Certificate not found at $CERT_PATH/fullchain.pem${NC}"
    echo "Please check your certificate path."
    exit 1
fi

if [ ! -f "$CERT_PATH/privkey.pem" ]; then
    echo -e "${RED}Error: Private key not found at $CERT_PATH/privkey.pem${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Certificates found${NC}"

# Check if nginx config exists in current directory
if [ ! -f "nginx-production.conf" ]; then
    echo -e "${RED}Error: nginx-production.conf not found in current directory${NC}"
    echo "Please run this script from the website directory"
    exit 1
fi

# Copy nginx config
echo "Copying Nginx configuration..."
cp nginx-production.conf /etc/nginx/sites-available/$NGINX_SITE

# Enable site
echo "Enabling Nginx site..."
ln -sf /etc/nginx/sites-available/$NGINX_SITE /etc/nginx/sites-enabled/

# Remove default site if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "Removing default Nginx site..."
    rm -f /etc/nginx/sites-enabled/default
fi

# Test nginx configuration
echo "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
    
    # Reload nginx
    echo "Reloading Nginx..."
    systemctl reload nginx
    
    echo -e "${GREEN}✓ Nginx successfully configured and reloaded${NC}"
    echo ""
    echo "Your website should now be accessible at:"
    echo "  - https://tryrankly.com"
    echo "  - https://www.tryrankly.com"
    echo ""
    echo "Check status with:"
    echo "  sudo systemctl status nginx"
    echo "  pm2 status"
else
    echo -e "${RED}✗ Nginx configuration test failed${NC}"
    echo "Please check the configuration and try again"
    exit 1
fi

