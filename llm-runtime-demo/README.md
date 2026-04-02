# llm-runtime-demo

A focused, CPU-first LLM runtime demo used in the handbook to teach Docker patterns for AI/ML workloads. Designed to be small in scope and validated in CI using a smoke-test mode without large model downloads.

## Prerequisites

- Python 3.12 or later
- Docker Engine 24 or later

## Run Commands

```text
# Docker build
docker build -t llm-runtime-demo .

# Smoke test (no model download)
docker run --rm -e LLM_MODE=smoke llm-runtime-demo

# Full run with model volume
docker run --rm -v "$PWD/models":/models -e LLM_MODE=full llm-runtime-demo
```

## Handbook Chapters

- Running LLM workloads with Docker

## Layout

- `starter/` — The starting point with a basic Python service and partial Docker configuration
- `completed/` — The final version with volume mounts, env configuration, and smoke-test mode
