# Rankly Website Deployment Guide

This guide will help you deploy the Rankly website to your Ubuntu server using PM2 and Nginx.

## Prerequisites

- Ubuntu server (18.04 or later)
- Domain name (tryrankly.com) pointing to your server's IP
- SSH access to your server
- Root or sudo access

## Quick Deployment

### Option 1: Automated Script (Recommended)

1. **Upload files to server:**
   ```bash
   # On your local machine
   scp -r website/* user@your-server:/var/www/rankly-website/
   ```

2. **Run deployment script on server:**
   ```bash
   # SSH into your server
   ssh user@your-server
   
   # Navigate to application directory
   cd /var/www/rankly-website
   
   # Make script executable and run
   chmod +x deploy.sh
   sudo ./deploy.sh
   ```

### Option 2: Manual Deployment

#### Step 1: Install Dependencies

```bash
# Update system
sudo apt-get update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# Install Certbot for SSL
sudo apt-get install -y certbot python3-certbot-nginx
```

#### Step 2: Setup Application Directory

```bash
# Create application directory
sudo mkdir -p /var/www/rankly-website
sudo mkdir -p /var/www/rankly-website/logs

# Set ownership (replace 'your-user' with your username)
sudo chown -R your-user:your-user /var/www/rankly-website

# Copy your website files to the server
# (Use scp, rsync, or git clone)
cd /var/www/rankly-website
```

#### Step 3: Install Dependencies and Build

```bash
cd /var/www/rankly-website

# Install npm packages
npm install

# Build the Next.js application
npm run build
```

#### Step 4: Setup PM2

```bash
# Start application with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions shown by the command above
```

#### Step 5: Configure Nginx

```bash
# Copy nginx configuration
sudo cp nginx-production.conf /etc/nginx/sites-available/tryrankly-website

# Enable the site
sudo ln -s /etc/nginx/sites-available/tryrankly-website /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

#### Step 6: Setup SSL Certificate

```bash
# Make sure your domain DNS is pointing to this server
# Then run certbot
sudo certbot --nginx -d tryrankly.com -d www.tryrankly.com

# Follow the prompts and enter your email
```

## Post-Deployment

### Verify Deployment

1. **Check PM2 status:**
   ```bash
   pm2 status
   pm2 logs rankly-website
   ```

2. **Check Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

3. **Visit your website:**
   - https://tryrankly.com
   - https://www.tryrankly.com

### Useful Commands

**PM2 Commands:**
```bash
pm2 status                    # Check application status
pm2 logs rankly-website      # View application logs
pm2 logs rankly-website --lines 100  # View last 100 lines
pm2 restart rankly-website   # Restart application
pm2 stop rankly-website      # Stop application
pm2 delete rankly-website    # Remove from PM2
pm2 monit                    # Monitor application
```

**Nginx Commands:**
```bash
sudo systemctl status nginx       # Check Nginx status
sudo systemctl start nginx        # Start Nginx
sudo systemctl stop nginx         # Stop Nginx
sudo systemctl restart nginx     # Restart Nginx
sudo systemctl reload nginx      # Reload Nginx config (no downtime)
sudo nginx -t                     # Test Nginx configuration
```

**Logs:**
```bash
# Application logs
tail -f /var/www/rankly-website/logs/website-combined.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Updating the Application

```bash
# SSH into server
ssh user@your-server

# Navigate to application directory
cd /var/www/rankly-website

# Pull latest changes (if using git)
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild the application
npm run build

# Restart PM2 process
pm2 restart rankly-website

# Check status
pm2 logs rankly-website --lines 50
```

## Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs rankly-website

# Check if port is in use
sudo netstat -tulpn | grep 3005

# Restart PM2
pm2 restart rankly-website
```

### Nginx 502 Bad Gateway
```bash
# Check if application is running
pm2 status

# Check application logs
pm2 logs rankly-website

# Verify Nginx is proxying to correct port
sudo cat /etc/nginx/sites-available/tryrankly-website | grep proxy_pass
```

### SSL Certificate Issues
```bash
# Renew SSL certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate expiration
sudo certbot certificates
```

### Permission Issues
```bash
# Fix ownership
sudo chown -R your-user:your-user /var/www/rankly-website

# Fix permissions
sudo chmod -R 755 /var/www/rankly-website
```

## Environment Variables

If you need to set environment variables, create a `.env` file in the application directory:

```bash
cd /var/www/rankly-website
nano .env
```

Add your variables:
```
NEXT_PUBLIC_SITE_URL=https://tryrankly.com
```

Then restart PM2:
```bash
pm2 restart rankly-website
```

## Monitoring

### Setup PM2 Monitoring (Optional)
```bash
# Install PM2 monitoring
pm2 install pm2-server-monit
```

### Setup Log Rotation (Recommended)
```bash
# Install pm2-logrotate
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed and auto-renewal enabled
- [ ] SSH key authentication enabled
- [ ] Regular security updates
- [ ] Application runs as non-root user
- [ ] Nginx configured with security headers

## Support

For issues or questions, check:
- PM2 logs: `pm2 logs rankly-website`
- Nginx logs: `/var/log/nginx/error.log`
- Application logs: `/var/www/rankly-website/logs/`

