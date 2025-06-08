#!/bin/bash
echo "Copying build files to /var/www/html"

# Get the actual deployment root path
DEPLOY_DIR=$(dirname "$(readlink -f "$0")")/..

# Clear existing files (optional)
sudo rm -rf /var/www/html/*

# Copy build output
sudo cp -r "$DEPLOY_DIR/build/"* /var/www/html/