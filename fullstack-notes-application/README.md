# fullstack-notes-application

The flagship project of the Docker Handbook. A full-stack notes application with a React frontend, Node.js backend, Postgres database, and NGINX reverse proxy, all orchestrated with Docker Compose v2.

## Prerequisites

- Node.js 22 or later
- Docker Engine 24 or later
- Docker Compose v2

## Run Commands

```text
# Docker Compose (recommended)
docker compose up --build -d

# Check service health
docker compose ps

# View logs
docker compose logs --no-color

# Tear down
docker compose down -v
```

## Handbook Chapters

- Shipping a full-stack notes application

## Layout

- `starter/` — The starting point with application code but incomplete Docker configuration
- `completed/` — The final version with multi-stage Dockerfiles, NGINX config, and Compose orchestration
