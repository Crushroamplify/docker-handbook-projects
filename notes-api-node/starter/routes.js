import { Router } from "express";
import { pool } from "./db.js";

export const router = Router();

// List all notes
router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM notes ORDER BY created_at DESC"
  );
  res.json(rows);
});

// Create a note
router.post("/", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }

  const { rows } = await pool.query(
    "INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *",
    [title, body]
  );
  res.status(201).json(rows[0]);
});

// Get a single note
router.get("/:id", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM notes WHERE id = $1", [
    req.params.id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "note not found" });
  }

  res.json(rows[0]);
});

// Update a note
router.put("/:id", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }

  const { rows } = await pool.query(
    "UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *",
    [title, body, req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "note not found" });
  }

  res.json(rows[0]);
});

// Delete a note
router.delete("/:id", async (req, res) => {
  const { rows } = await pool.query(
    "DELETE FROM notes WHERE id = $1 RETURNING *",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "note not found" });
  }

  res.status(200).json({ message: "note deleted" });
});
