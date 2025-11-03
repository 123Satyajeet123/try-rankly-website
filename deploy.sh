#!/bin/bash

# Rankly Website Deployment Script for Ubuntu Server
# Run this script on your Ubuntu server to deploy the website

set -e

echo "🚀 Starting Rankly Website Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variables
DOMAIN="tryrankly.com"
APP_DIR="/var/www/rankly-website"
NGINX_SITE="tryrankly-website"
PORT=3005

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
    pm2 startup systemd -u $SUDO_USER --hp /home/$SUDO_USER
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get update
    apt-get install -y nginx
fi

echo -e "${YELLOW}Step 2: Creating application directory...${NC}"
mkdir -p $APP_DIR
mkdir -p $APP_DIR/logs
chown -R $SUDO_USER:$SUDO_USER $APP_DIR

echo -e "${YELLOW}Step 3: Setting up application...${NC}"
echo "Please copy your website files to: $APP_DIR"
echo "Then run the following commands:"
echo ""
echo "  cd $APP_DIR"
echo "  npm install"
echo "  npm run build"
echo ""

read -p "Have you copied the files and run npm install? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please copy files and run npm install, then run this script again."
    exit 1
fi

echo -e "${YELLOW}Step 4: Setting up PM2...${NC}"
cd $APP_DIR

# Check if ecosystem.config.js exists
if [ ! -f "ecosystem.config.js" ]; then
    echo -e "${RED}Error: ecosystem.config.js not found in $APP_DIR${NC}"
    exit 1
fi

# Stop existing PM2 process if running
pm2 stop rankly-website 2>/dev/null || true
pm2 delete rankly-website 2>/dev/null || true

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save

echo -e "${GREEN}✓ PM2 setup complete${NC}"

echo -e "${YELLOW}Step 5: Setting up Nginx...${NC}"

# Copy nginx config
if [ -f "nginx-production.conf" ]; then
    cp nginx-production.conf /etc/nginx/sites-available/$NGINX_SITE
    
    # Enable site
    ln -sf /etc/nginx/sites-available/$NGINX_SITE /etc/nginx/sites-enabled/
    
    # Remove default nginx site if it exists
    rm -f /etc/nginx/sites-enabled/default
    
    # Test nginx config
    nginx -t
    
    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo -e "${GREEN}✓ Nginx configuration updated${NC}"
    else
        echo -e "${RED}✗ Nginx configuration test failed${NC}"
        exit 1
    fi
else
    echo -e "${RED}Error: nginx-production.conf not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 6: Setting up SSL with Certbot...${NC}"

# Install Certbot if not installed
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
fi

# Check if SSL certificate exists
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "Setting up SSL certificate..."
    echo "Make sure your domain $DOMAIN points to this server's IP address"
    read -p "Is DNS configured correctly? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || {
            echo -e "${YELLOW}SSL certificate setup failed. You can run it manually later with:${NC}"
            echo "  certbot --nginx -d $DOMAIN -d www.$DOMAIN"
        }
    else
        echo -e "${YELLOW}Skipping SSL setup. Run manually after DNS is configured:${NC}"
        echo "  certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    fi
else
    echo -e "${GREEN}✓ SSL certificate already exists${NC}"
fi

echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "Summary:"
echo "  - Application: $APP_DIR"
echo "  - Domain: $DOMAIN"
echo "  - Port: $PORT"
echo "  - PM2 Process: rankly-website"
echo ""
echo "Useful commands:"
echo "  pm2 status                    # Check application status"
echo "  pm2 logs rankly-website      # View application logs"
echo "  pm2 restart rankly-website   # Restart application"
echo "  pm2 stop rankly-website      # Stop application"
echo "  systemctl status nginx       # Check Nginx status"
echo "  systemctl reload nginx       # Reload Nginx config"
echo ""
echo "Visit your site at: https://$DOMAIN"

