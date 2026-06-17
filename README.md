# To The Races - E2E Testing Comparison Project

A webshop selling subscriptions to horse races, built for comparing E2E testing tool performance (Cypress, Playwright, SerenityBDD).

## Tech Stack

- **Backend**: Kotlin + Ktor (JVM)
- **Frontend**: React + TypeScript (Vite)
- **Database**: H2 (in-memory)
- **Payment**: Stripe integration (mock)

## Quick Start

### One Command (Docker)
```bash
cd /Users/matt/projects/to-the-races
docker-compose up --build
```

This starts:
- **Backend API** on http://localhost:8080
- **Frontend** on http://localhost:3000

### One Command (Local)
```bash
./scripts/start.sh
```

## Project Structure

```
to-the-races/
├── backend/           # Kotlin Ktor backend
│   ├── src/main/kotlin/com/toraces/api/
│   │   ├── Application.kt   # Main app entry
│   │   ├── DatabaseFactory.kt # ORM entities
│   │   └── Routing.kt       # API endpoints
│   └── build.gradle.kts
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/     # Login, Register, Dashboard, Plans
│   │   ├── components/
│   │   ├── services/api.ts
│   │   └── test/      # Vitest unit tests
│   ├── cypress/e2e/   # Cypress E2E tests
│   └── playwright/e2e/ # Playwright E2E tests
├── serenity-tests/    # SerenityBDD E2E tests
└── scripts/
    ├── start.sh       # Quick start script
    └── run-and-time.sh # Timing comparison
```

## User Workflows (All 3 E2E Tools)

| # | Workflow | Description |
|---|----------|-------------|
| 1 | Create New User | Registration with email, username, name, password |
| 2 | Login | Authentication with JWT token |
| 3 | Login and Edit Account Name | Update profile name |
| 4 | Login and Purchase Subscription | Subscribe to race feeds |
| 5 | Login and Edit Username | Update username |
| 6 | Login and Cancel Subscription | Cancel active subscription |

## Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| Basic | $9.99/month | Access to basic race feeds |
| Premium | $19.99/month | Live feeds + expert tips |
| Elite | $29.99/month | All features + exclusive stats |

## Running Tests

### Unit Tests
```bash
# Frontend (Vitest)
cd frontend && npm run test

# Backend (JUnit)
cd backend && ./gradlew test
```

### E2E Tests - All Tools
```bash
# Individual tools
cd frontend && npx cypress run
cd frontend && npx playwright test
cd serenity-tests && mvn test

# Timing comparison (all tools)
./scripts/run-and-time.sh
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Create new user |
| POST | /api/login | Login (returns JWT) |
| GET | /api/me | Get current user |
| PUT | /api/me | Update profile |
| GET | /api/subscription | Get subscription |
| POST | /api/subscription | Create subscription |
| DELETE | /api/subscription | Cancel subscription |

## Docker Commands

```bash
# Start all services
docker-compose up --build

# Run Cypress tests in Docker
docker-compose --profile test run cypress-tests

# Run Playwright tests in Docker
docker-compose --profile test run playwright-tests

# Stop all services
docker-compose down
```

## Environment Variables

```bash
# Backend (.env)
JWT_SECRET=your-secret-key-here
DATABASE_URL=jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;
STRIPE_SECRET_KEY=your-stripe-key

# Frontend
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```