#!/bin/bash

echo "Update code..."
git pull

echo "Rebuild Docker image..."
docker build -f .docker/Dockerfile -t trip-builder-preview:latest .

echo "Rebuild container..."
docker stop trip-builder
docker rm trip-builder
docker run -d \
  --name trip-builder \
  --restart always \
  -p 127.0.0.1:3000:80 \
  trip-builder-preview:latest

echo "Ready! Application update successfully!."
