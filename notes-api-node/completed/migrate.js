import { pool } from "./db.js";

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log("Migration complete: notes table created.");
  await pool.end();
};

createTable().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
