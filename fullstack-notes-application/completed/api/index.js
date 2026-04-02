import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/notes", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *",
      [title, body]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
