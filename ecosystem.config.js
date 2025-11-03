/**
 * PM2 Ecosystem Configuration for Rankly Website
 * Run: pm2 start ecosystem.config.js --env production
 */

const path = require('path');

module.exports = {
  apps: [
    {
      name: 'rankly-website',
      script: 'npm',
      args: 'start',
      cwd: path.resolve(__dirname),
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3005,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      error_file: './logs/website-error.log',
      out_file: './logs/website-out.log',
      log_file: './logs/website-combined.log',
      time: true,
      merge_logs: true,
      max_memory_restart: '500M',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};

