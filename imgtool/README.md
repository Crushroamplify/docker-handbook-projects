# imgtool

A Python CLI tool for inspecting image files in a directory. Used in the handbook to teach utility containers, exec-form ENTRYPOINT, and bind-mount workflows.

Supersedes the legacy `rmbyext` project.

## Prerequisites

- Python 3.12 or later
- Docker Engine 24 or later

## Run Commands

```text
# Local usage
pip install .
imgtool report /path/to/images

# Docker build
docker build -t imgtool .

# Docker run with bind mount
docker run --rm -v "$PWD/fixtures":/workspace imgtool report /workspace
```

## Handbook Chapters

- Utility containers with imgtool

## Layout

- `starter/` — The starting point with partial Dockerfile for the reader to complete
- `completed/` — The final version with working Dockerfile and ENTRYPOINT
