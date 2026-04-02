FROM python:3.12-alpine
WORKDIR /app
COPY pyproject.toml .
COPY imgtool/ imgtool/
RUN pip install --no-cache-dir .
ENTRYPOINT ["imgtool"]
CMD ["report", "/workspace"]
