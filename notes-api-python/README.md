# notes-api-python

A compact Python HTTP service for managing notes. Used in the handbook to teach containerizing Python applications with dependency optimization.

## Prerequisites

- Python 3.12 or later
- Docker Engine 24 or later

## Run Commands

```text
# Local development
pip install -r requirements.txt
python -m pytest
python main.py

# Docker build
docker build -t notes-api-python .

# Docker run
docker run --rm -p 8080:8080 notes-api-python
```

## Handbook Chapters

- Containerizing a Python service

## Layout

- `starter/` — The starting point with a working Python service and a basic Dockerfile
- `completed/` — The final version with optimized dependency install and non-root user
