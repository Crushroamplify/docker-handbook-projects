import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_DATABASE || "notesdb",
  password: process.env.DB_PASSWORD || "secret",
});
