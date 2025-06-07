#!/bin/bash
echo "Copying build files to /var/www/html"
cp -r /tmp/codedeploy-deployment-*/deployment-archive/build/* /var/www/html/