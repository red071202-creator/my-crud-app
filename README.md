# Tasks CRUD App

A learning project built with Next.js, Prisma, SQLite, and custom authentication.

## Features

- Register with email and password
- Login with email and password
- Login with Google
- Password hashing with bcryptjs
- Session-based authentication with cookies
- Protected dashboard
- Create, read, update, complete, and delete tasks
- Toast notifications with Sonner

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- bcryptjs
- Sonner

## Getting Started

Install dependencies:

```bash
npm install
```

Create and update the local database:

```bash
npx.cmd prisma migrate dev
```

Generate Prisma Client:

```bash
npx.cmd prisma generate
```

Run the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

For Google login, create OAuth credentials in Google Cloud Console and use this local redirect URI:

```txt
http://localhost:3000/api/auth/google/callback
```

## Prisma

Open Prisma Studio:

```bash
npx.cmd prisma studio
```

After changing `prisma/schema.prisma`, run:

```bash
npx.cmd prisma migrate dev
npx.cmd prisma generate
```

If the dev server is running, restart it after schema changes:

```bash
npm run dev
```

## Notes

This project uses SQLite for local learning. For deployment, the database can later be migrated to PostgreSQL.
