# Tasks App

A full-stack task management application built with NestJS, React, PostgreSQL, and Prisma in a pnpm monorepo.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, shadcn/ui, TanStack Query
- **Backend:** NestJS, Prisma 7, PostgreSQL
- **Shared Packages:** Shared Zod validation schemas (`@repo/validators`), Prisma database client (`@repo/database`)

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (`npm install -g pnpm`)
- **PostgreSQL** running locally on port `5432`

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd tasks-app-practical-exam
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in `packages/database/`:

```bash
cp packages/database/.env.example packages/database/.env
```

Open `packages/database/.env` and update your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tasks_db"
```

### 3. Run Database Migrations

Generate the Prisma client and apply migrations:

```bash
pnpm db:migrate
```

### 4. Start the Application

Run both the backend API and frontend web app concurrently:

```bash
pnpm dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

---

## Useful Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts both frontend and backend concurrently in watch mode |
| `pnpm dev:api` | Starts only the NestJS API |
| `pnpm dev:web` | Starts only the Vite React app |
| `pnpm build` | Builds all packages and apps for production |
| `pnpm db:migrate` | Runs Prisma migrations in development |
| `pnpm db:studio` | Opens Prisma Studio in browser to view/edit database records |
| `pnpm lint` | Runs linter across all packages |

---

## Project Structure

```text
├── apps/
│   ├── api/                  # NestJS backend API
│   └── web/                  # Vite + React frontend
└── packages/
    ├── database/             # Prisma schema, migrations, and database client
    ├── validators/           # Shared Zod schemas and TypeScript types
    └── typescript-config/    # Shared TypeScript configs
```

---

## Features

- **Create & Manage Tasks:** Add tasks with optional descriptions, toggle completion status, and delete tasks.
- **Search & Filter:** Search tasks in real-time by title/description and filter by status (All, Incomplete, Completed).
- **End-to-End Type Safety:** Shared Zod schemas between frontend and backend to guarantee data validation.
- **Confirmation Modals:** Deletion confirmation dialogs to prevent accidental deletes.
- **Clean UI:** Responsive design built with Tailwind CSS v4 and shadcn/ui components.
