# User Management — Full-Stack Application

A production-ready full-stack web application for managing users, built with **FastAPI**, **React (Vite)**, **PostgreSQL**, and **JWT authentication**.

---

## Project Structure

```
react_web/
├── backend/
│   ├── alembic/              # Database migrations
│   │   ├── versions/
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py     # Environment & settings
│   │   │   ├── database.py   # Async SQLAlchemy engine
│   │   │   └── security.py   # JWT + password hashing
│   │   ├── models/
│   │   │   └── user.py       # SQLAlchemy User model
│   │   ├── schemas/
│   │   │   └── user.py       # Pydantic request/response schemas
│   │   ├── repository/
│   │   │   └── user_repository.py  # Data-access layer
│   │   ├── services/
│   │   │   └── user_service.py     # Business logic
│   │   └── routers/
│   │       ├── auth.py       # Register / Login / Refresh
│   │       └── users.py      # CRUD endpoints
│   ├── main.py               # FastAPI entry point
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/              # Axios client & API functions
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React auth context
│   │   ├── hooks/            # React Query hooks
│   │   ├── pages/            # Login, Register, Dashboard, Profile
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

---

## Prerequisites

- **Python 3.11+**
- **Node.js 18+** & npm
- **PostgreSQL 14+**

---

## Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE user_management;
```

2. The default connection string (in `backend/.env`):

```
postgresql+asyncpg://postgres:postgres@localhost:5432/user_management
```

Update the credentials to match your local PostgreSQL setup.

---

## Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic revision --autogenerate -m "create users table"
alembic upgrade head

# Start the server
uvicorn main:app --reload
```

The API will be available at **http://localhost:8000**.

- Swagger docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend will be available at **http://localhost:5173**.

The Vite dev server proxies `/api` requests to the backend at `localhost:8000`.

---

## API Endpoints

| Method | Endpoint             | Auth     | Description          |
|--------|----------------------|----------|----------------------|
| POST   | /api/auth/register   | Public   | Register a new user  |
| POST   | /api/auth/login      | Public   | Login, get JWT       |
| POST   | /api/auth/refresh    | Public   | Refresh access token |
| GET    | /api/users/          | Required | List all users       |
| GET    | /api/users/me        | Required | Get current user     |
| GET    | /api/users/{id}      | Required | Get user by ID       |
| PUT    | /api/users/{id}      | Required | Update user          |
| DELETE | /api/users/{id}      | Required | Delete user          |
| GET    | /health              | Public   | Health check         |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable                     | Description                        | Default                           |
|------------------------------|------------------------------------|-----------------------------------|
| DATABASE_URL                 | PostgreSQL async connection string | postgresql+asyncpg://...          |
| SECRET_KEY                   | JWT signing key                    | change-me-...                     |
| ALGORITHM                    | JWT algorithm                      | HS256                             |
| ACCESS_TOKEN_EXPIRE_MINUTES  | Access token TTL (minutes)         | 30                                |
| REFRESH_TOKEN_EXPIRE_DAYS    | Refresh token TTL (days)           | 7                                 |
| CORS_ORIGINS                 | Allowed CORS origins (JSON array)  | ["http://localhost:5173"]         |

---

## Tech Stack

| Layer          | Technology                              |
|----------------|-----------------------------------------|
| Frontend       | React 19, TypeScript, Vite              |
| Styling        | TailwindCSS                             |
| State          | TanStack React Query                    |
| HTTP Client    | Axios (with interceptors)               |
| Backend        | FastAPI (Python)                        |
| ORM            | SQLAlchemy 2.0 (async)                  |
| Migrations     | Alembic                                 |
| Database       | PostgreSQL + asyncpg                    |
| Auth           | JWT (access + refresh), bcrypt          |
