# hello-dock

A minimal React + Vite frontend application used throughout the Docker Handbook to teach containerization fundamentals.

## Prerequisites

- Node.js 22 or later
- Docker Engine 24 or later

## Run Commands

```text
# Local development
npm install
npm run dev

# Docker build (completed version)
docker build -t hello-dock .

# Docker run
docker run --rm -p 8080:80 hello-dock
```

## Handbook Chapters

- Running your first containers
- Working with bind mounts, volumes, and host files
- Building your first Docker image
- Writing better Dockerfiles with caching and .dockerignore
- Multi-stage builds, non-root users, and smaller images
- Containerizing a modern frontend application

## Layout

- `starter/` — The starting point before Docker support is added
- `completed/` — The final version with production Dockerfile, dev Dockerfile, and .dockerignore
