# audvote

A music review and rating platform.

## Disclaimer

This project is in active development; therefore, this README may contain inaccurate or incomplete information.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Auth.js v5

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm
- Docker Desktop

### Setup

1. Clone the repository:

```bash
git clone git@github.com:melekredwan-dev/audvote.git
cd audvote
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the database:

```bash
docker compose up -d
```

5. Run database migrations:

```bash
pnpm db:push
```

6. Start the dev server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000/)

## Database Commands

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm db:generate` | Generate migration files from schema changes |
| `pnpm db:migrate`  | Run pending migrations                       |
| `pnpm db:push`     | Push schema directly                         |
| `pnpm db:studio`   | Open Drizzle Studio GUI                      |
