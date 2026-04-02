FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod ./
COPY *.go ./
RUN CGO_ENABLED=0 go build -o server .

FROM alpine:3.19
RUN adduser -D -u 1001 appuser
WORKDIR /app
COPY --from=build /app/server .
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["./server"]
