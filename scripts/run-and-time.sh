#!/bin/bash

# Script to run e2e tests and measure execution times
# Usage: ./run-and-time.sh

BACKEND_URL="http://localhost:8080"
FRONTEND_URL="http://localhost:3000"
RESULTS_DIR="./test-results"

mkdir -p "$RESULTS_DIR"

echo "===== E2E Test Timing Comparison ====="
echo "Starting at: $(date)"
echo ""

# Initialize CSV
echo "tool,test_name,duration_seconds,exit_code" > "$RESULTS_DIR/timing-results.csv"

# Function to time a command
time_command() {
    local tool=$1
    local test_name=$2
    local start_time=$(date +%s.%N)
    
    echo "Running $tool - $test_name..."
    $3 2>&1 | tee "$RESULTS_DIR/${tool}-${test_name}-output.log"
    local exit_code=${PIPESTATUS[0]}
    
    local end_time=$(date +%s.%N)
    local duration=$(echo "$end_time - $start_time" | bc)
    
    echo "${tool},${test_name},${duration},${exit_code}" >> "$RESULTS_DIR/timing-results.csv"
    echo "$tool $test_name completed in ${duration}s (exit code: $exit_code)"
    echo ""
}

# Cypress tests
echo "=== Cypress Tests ==="
time_command "cypress" "create-user" "npx cypress run --spec cypress/e2e/create-user.cy.js"
time_command "cypress" "login" "npx cypress run --spec cypress/e2e/login.cy.js"
time_command "cypress" "login-edit-account" "npx cypress run --spec cypress/e2e/login-edit-account.cy.js"
time_command "cypress" "login-purchase-subscription" "npx cypress run --spec cypress/e2e/login-purchase-subscription.cy.js"
time_command "cypress" "login-edit-username" "npx cypress run --spec cypress/e2e/login-edit-username.cy.js"
time_command "cypress" "login-cancel-subscription" "npx cypress run --spec cypress/e2e/login-cancel-subscription.cy.js"

echo "=== Playwright Tests ==="
time_command "playwright" "create-user" "npx playwright test playwright/e2e/create-user.spec.js"
time_command "playwright" "login" "npx playwright test playwright/e2e/login.spec.js"
time_command "playwright" "login-edit-account" "npx playwright test playwright/e2e/login-edit-account.spec.js"
time_command "playwright" "login-purchase-subscription" "npx playwright test playwright/e2e/login-purchase-subscription.spec.js"
time_command "playwright" "login-edit-username" "npx playwright test playwright/e2e/login-edit-username.spec.js"
time_command "playwright" "login-cancel-subscription" "npx playwright test playwright/e2e/login-cancel-subscription.spec.js"

echo "=== SerenityBDD Tests ==="
time_command "serenity" "CreateUserTest" "cd serenity-tests && mvn test -Dtest=CreateUserTest"
time_command "serenity" "LoginTest" "cd serenity-tests && mvn test -Dtest=LoginTest"
time_command "serenity" "LoginEditAccountTest" "cd serenity-tests && mvn test -Dtest=LoginEditAccountTest"
time_command "serenity" "LoginPurchaseSubscriptionTest" "cd serenity-tests && mvn test -Dtest=LoginPurchaseSubscriptionTest"
time_command "serenity" "LoginEditUsernameTest" "cd serenity-tests && mvn test -Dtest=LoginEditUsernameTest"
time_command "serenity" "LoginCancelSubscriptionTest" "cd serenity-tests && mvn test -Dtest=LoginCancelSubscriptionTest"

echo ""
echo "===== Summary ==="
echo "Results saved to $RESULTS_DIR/timing-results.csv"
echo ""
echo "Timing Comparison:"
echo "-----------------"
awk -F',' 'NR>1 { printf "%-15s %-25s %s seconds\n", $1, $2, $3 }' "$RESULTS_DIR/timing-results.csv"