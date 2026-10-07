# Draw app

This repository contains the drawing application, chat room frontend, HTTP
backend, WebSocket backend, and shared workspace packages.

## Run with Docker

The complete stack runs without Nginx or another reverse proxy. Docker Compose
starts PostgreSQL, applies the Prisma migrations, and then starts both
frontends, the HTTP API, and the WebSocket API.

```sh
docker compose up --build
```

Services are exposed directly on the host:

- `http://localhost:3000` - `web`
- `http://localhost:3002` - `excalidraw-frontend`
- `http://localhost:3001` - HTTP API
- `ws://localhost:8080` - WebSocket API
- `localhost:5432` - PostgreSQL

For non-development values, create a root `.env` file before starting the
stack. Supported settings include `JWT_SECRET`, `POSTGRES_PASSWORD`,
`POSTGRES_DB`, `POSTGRES_USER`, `NEXT_PUBLIC_HTTP_BACKEND`, and
`NEXT_PUBLIC_WS_URL`.

Stop the stack while preserving database data:

```sh
docker compose down
```

Remove the database volume as well:

```sh
docker compose down -v
```

## Local development

Install dependencies with pnpm, then use the workspace scripts:

```sh
pnpm install
pnpm dev
```

Useful checks:

```sh
pnpm check-types
pnpm lint
```
