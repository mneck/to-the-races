#!/bin/bash
# Docker run scripts for the To The Races project

cd "$(dirname "$0")/.."

case "$1" in
  "up")
    echo "Starting all services..."
    docker-compose up --build
    ;;
  "down")
    echo "Stopping all services..."
    docker-compose down
    ;;
  "cypress")
    echo "Running Cypress tests..."
    docker-compose --profile test run --rm cypress-tests
    ;;
  "playwright")
    echo "Running Playwright tests..."
    docker-compose --profile test run --rm playwright-tests
    ;;
  "serenity")
    echo "Running SerenityBDD tests..."
    docker-compose --profile test run --rm serenity-tests
    ;;
  "time-all")
    echo "Running timing comparison..."
    # Start services
    docker-compose up -d
    # Wait for services
    sleep 15
    # Run all tests and time them
    ./scripts/run-and-time.sh
    # Stop services
    docker-compose down
    ;;
  *)
    echo "Usage: $0 {up|down|cypress|playwright|serenity|time-all}"
    echo ""
    echo "Commands:"
    echo "  up        - Start backend and frontend"
    echo "  down      - Stop all services"
    echo "  cypress   - Run Cypress E2E tests in Docker"
    echo "  playwright - Run Playwright E2E tests in Docker"
    echo "  serenity  - Run SerenityBDD tests in Docker"
    echo "  time-all  - Run all tests and compare timing"
    ;;
esac
