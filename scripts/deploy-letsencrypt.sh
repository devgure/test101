#!/bin/bash
# scripts/deploy-letsencrypt.sh

echo "🔧 Setting up Let's Encrypt"

sudo docker run -d \
  -v /etc/letsencrypt \
  -v /var/lib/letsencrypt \
  -v /usr/share/nginx/html \
  -p 80:80 \
  -p 443:443 \
  --name nginx-certbot \
  nginx:alpine

sudo docker run --rm -it \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  certbot/certbot certonly --standalone -d sparkr.com --email admin@sparkr.com --agree-tos -n