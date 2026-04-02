import express from "express";
import { pool } from "./db.js";
import { router as notesRouter } from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Notes API listening on port ${port}`);
});
