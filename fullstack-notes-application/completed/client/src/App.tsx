import { useEffect, useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      setTitle("");
      setBody("");
      fetchNotes();
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  }

  async function deleteNote(id: number) {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  }

  return (
    <div className="container">
      <h1>Notes</h1>

      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-content">
              <h3>{note.title}</h3>
              <p>{note.body}</p>
              <small>{new Date(note.created_at).toLocaleString()}</small>
            </div>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
