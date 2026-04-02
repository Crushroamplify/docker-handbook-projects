# notes-api-go

A compact Go HTTP service for managing notes. Used in the handbook to teach containerizing Go applications with multi-stage builds.

## Prerequisites

- Go 1.22 or later
- Docker Engine 24 or later

## Run Commands

```text
# Local development
go run .
go test ./...

# Docker build
docker build -t notes-api-go .

# Docker run
docker run --rm -p 8080:8080 notes-api-go
```

## Handbook Chapters

- Containerizing a Go service

## Layout

- `starter/` — The starting point with a working Go service and a basic Dockerfile
- `completed/` — The final version with multi-stage build and non-root user
