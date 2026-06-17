#!/bin/bash
# One-command start for the To The Races project

echo "Starting To The Races - Horse Racing Subscriptions..."
echo ""
echo "This will start:"
echo "  - Backend API on http://localhost:8080"
echo "  - Frontend on http://localhost:3000"
echo ""
echo "The first build may take a few minutes..."
echo ""

# Clean up any existing containers
docker-compose down --remove-orphans 2>/dev/null

# Build and start
docker-compose up --build

# Cleanup on exit
docker-compose down

echo ""
echo "Services stopped."