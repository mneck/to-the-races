# To The Races

A full-stack application for e2e testing practice with JPA, JDBC, PostgreSQL, Spring Boot, and Vite + React + TypeScript. Features login/registration and Stripe Checkout integration.

## Tech Stack

- **Backend**: Spring Boot 3.3, JPA, PostgreSQL, Maven, JWT auth, Stripe API
- **Frontend**: Vite, React 18, TypeScript, React Router

## Prerequisites

- Java 21+
- Node.js 18+
- PostgreSQL (local or Docker)
- [Stripe account](https://dashboard.stripe.com) (test mode)

## Setup

### 1. PostgreSQL

Using Docker Compose (recommended):

```bash
docker compose up -d postgres
```

Or create a database manually:

```bash
createdb totheraces
```

### 2. Backend

```bash
cd backend
```

Set environment variables (or edit `application.yml`):

```bash
export STRIPE_SECRET_KEY=sk_test_your_key_here
export STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

Run:

```bash
./mvnw spring-boot:run
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Stripe

1. Get test API keys from [Stripe Dashboard → Developers → API keys](https://dashboard.stripe.com/test/apikeys)
2. Set `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
3. For checkout tests, use card **4242 4242 4242 4242** with any future expiry and CVC

## Default Test User

On first run, a test user is created:

- **Email**: `test@example.com`
- **Password**: `password123`

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login |
| GET | /api/health | No | Health check |
| POST | /api/checkout/create-session | Yes | Create Stripe Checkout session |

## E2E Test Scenarios

1. **Login flow**: Register → Login → Access protected page
2. **Checkout flow**: Login → Checkout page → Create session → Stripe redirect → Success page

## Project Structure

```
├── backend/                 # Spring Boot
│   ├── src/main/java/
│   │   └── com/totheraces/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── entity/
│   │       ├── repository/
│   │       ├── security/
│   │       └── service/
│   └── pom.xml
├── frontend/                # Vite + React
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
└── README.md
```
