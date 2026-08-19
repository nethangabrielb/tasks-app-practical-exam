# Vite + NestJS Monorepo Template

A pnpm monorepo template providing a NestJS backend API, a Vite React frontend, and a PostgreSQL database layer managed by Prisma 7. This repository is intended as a clean, type-safe starter infrastructure to build fullstack applications on, not a finished product.

## Prerequisites

- **Node.js**: `>= 20` (Node 24 recommended)
- **pnpm**: `11.20.0` (or `pnpm >= 11`)
- **PostgreSQL**: A running local PostgreSQL instance or Docker container (`5432`)

## Project Structure

```text
├── apps/
│   ├── api/                  # NestJS backend application
│   └── web/                  # Vite + React frontend application
└── packages/
    ├── database/             # Prisma 7 schema, migrations, and client singleton
    ├── typescript-config/    # Shared base TypeScript configurations
    └── validators/           # Shared Zod validation schemas
```

## First-Time Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd vite-nestjs-template
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp packages/database/.env.example packages/database/.env
   ```
   Open `packages/database/.env` and update `DATABASE_URL` with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/your_database"
   ```

4. **Generate the Prisma client:**
   ```bash
   pnpm --filter @repo/database db:generate
   ```

5. **Run database migrations:**
   ```bash
   pnpm run db:migrate
   ```

6. **Start development servers:**
   ```bash
   pnpm run dev
   ```

## Everyday Commands

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Generates Prisma client, builds packages, and runs `api` and `web` concurrently in watch mode |
| `pnpm run dev:api` | Starts only the NestJS API in watch mode |
| `pnpm run dev:web` | Starts only the Vite React frontend dev server |
| `pnpm run build` | Builds shared packages and compiles both applications for production |
| `pnpm run db:migrate` | Applies Prisma migrations in development (`prisma migrate dev`) |
| `pnpm run db:studio` | Opens Prisma Studio GUI in the browser to view and edit database data |
| `pnpm run lint` | Runs ESLint across all workspace packages and apps |
| `pnpm run format` | Formats all files across the repository with Prettier |

## Default Ports

- **Frontend (`apps/web`)**: [http://localhost:5173](http://localhost:5173) (includes proxying `/api` requests to backend)
- **Backend API (`apps/api`)**: [http://localhost:3000](http://localhost:3000) (configurable via `PORT` environment variable)

## Troubleshooting

- **Port already in use (`EADDRINUSE`)**:
  - *Cause*: A previous development process is still holding port 3000 or 5173.
  - *Fix*: Free both ports by running `kill -9 $(lsof -t -i :3000 -i :5173) 2>/dev/null || true`.

- **Database connection error (`P1001`)**:
  - *Cause*: PostgreSQL is not running or credentials in `packages/database/.env` are incorrect.
  - *Fix*: Start your PostgreSQL server and verify the connection string in `packages/database/.env`.

- **Prisma Client module missing after clone or pull**:
  - *Cause*: Prisma runtime client has not been generated into `packages/database/generated`.
  - *Fix*: Run `pnpm --filter @repo/database db:generate && pnpm --filter @repo/database build`.
