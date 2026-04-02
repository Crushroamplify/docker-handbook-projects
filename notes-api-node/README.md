# notes-api-node

A Node.js REST API backed by Postgres for managing notes. Used in the handbook to teach containerizing a Node.js application with a database, Compose v2, and multi-container workflows.

Migrated from the legacy `notes-api` project.

## Prerequisites

- Node.js 22 or later
- Docker Engine 24 or later
- Docker Compose v2

## Run Commands

```text
# Local development
npm install
npm test

# Docker build
docker build -t notes-api-node .

# Docker Compose
docker compose up --build -d
```

## Handbook Chapters

- Compose v2 and multi-service development
- Containerizing a Node.js API with Postgres

## Layout

- `starter/` — The starting point for containerizing the Node API
- `completed/` — The final version with Compose, migrations, and production Dockerfile
