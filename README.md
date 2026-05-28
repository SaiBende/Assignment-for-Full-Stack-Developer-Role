# Auth RBAC

Full stack app with login, registration, and role-based access control. Users get either USER or ADMIN role and see different content based on that.

Backend is Spring Boot with JWT auth, frontend is React + TypeScript with Vite, and the database is PostgreSQL running in Docker.
<p align="center">
  <img src="https://github.com/user-attachments/assets/15607f3c-2363-4dfd-b492-2e0d421eea8c" width="45%" />
  <img src="https://github.com/user-attachments/assets/96b74425-214e-4705-912b-319905392986" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/24eb0689-4d1a-4c39-8e65-055c444b05e3" width="45%" />
  <img src="https://github.com/user-attachments/assets/30e9158d-821c-4529-991f-8944a49b53a1" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0c2bee55-98ec-4792-b56c-a2120588e6a5" width="45%" />
</p>

---

## What you need

- Java 17
- Node.js 20
- Docker Desktop

---

## Running the project

### 1. Start the database

```bash
cd springbootbackendauthrbac
docker compose up -d
```

That boots up PostgreSQL 17 on port 5432. The db name is `auth_rbac_db`, user and password are both `postgres`.

### 2. Start the backend

```bash
cd springbootbackendauthrbac
.\mvnw.cmd spring-boot:run
```

The API will be at `http://localhost:8080`.

A few endpoints -

- `POST /api/auth/register` — create an account (no token needed)
- `POST /api/auth/login` — get a JWT token
- `GET /api/public` — anyone can hit this
- `GET /api/user` — needs USER or ADMIN role
- `GET /api/admin` — needs ADMIN role only
- `/swagger-ui.html` — Swagger docs, open to all

You can override config with env vars if you want — `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, `PORT`. They all have sensible defaults.

### 3. Start the frontend

```bash
cd reactvitefrontendauthrbac
npm install
npm run dev
```

Opens at `http://localhost:5173`. Three pages —

- `/login` — sign in with email and password
- `/register` — sign up with name, email, password, pick a role
- `/dashboard` — shows content cards based on your role

---

## Trying it out with curl

Register an admin user:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","password":"password123","role":"ADMIN"}'
```

Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"password123"}'
```

Use the token from the response to hit a protected route:

```bash
curl http://localhost:8080/api/admin \
  -H "Authorization: Bearer <token>"
```

---

## How the code is organized

**Backend** (`springbootbackendauthrbac/`) — pretty standard Spring Boot layout. Controllers in `controller/`, security stuff in `security/`, entities in `entity/`, DTOs in `dto/`, MapStruct mapper in `mapper/`, and the service layer in `service/`. Config classes sit in `config/`.

**Frontend** (`reactvitefrontendauthrbac/`) — all the source is under `src/`. API calls are in `api/`, reusable components in `components/`, auth state management in `context/`, and page views in `pages/`.
