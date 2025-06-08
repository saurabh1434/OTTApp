#!/bin/bash
echo "Copying build files to /var/www/html"

DEPLOY_DIR=$(dirname "$(readlink -f "$0")")/..

# Create the directory if it doesn't exist
if [ ! -d /var/www/html ]; then
  sudo mkdir -p /var/www/html
fi

# Optional: Clear old files
sudo rm -rf /var/www/html/*

# Copy files
sudo cp -r "$DEPLOY_DIR/build/"* /var/www/html/