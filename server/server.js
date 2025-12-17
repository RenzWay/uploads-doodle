require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploads = require("./storage");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let notes = [];
let idCounter = 1;

// GET
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!", data: notes });
});

// POST
app.post("/notes", uploads.single("image"), (req, res) => {
  const { name, title, content } = req.body;

  if (!name || !title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newNote = {
    id: idCounter++,
    name,
    title,
    content,
    image: req.file
      ? {
          url: req.file.path,
          public_id: req.file.filename,
        }
      : null,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT
app.put("/notes/:id", uploads.single("image"), async (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });

  note.name = req.body.name ?? note.name;
  note.title = req.body.title ?? note.title;
  note.content = req.body.content ?? note.content;

  if (req.file) {
    if (note.image?.public_id) {
      await cloudinary.uploader.destroy(note.image.public_id);
    }

    note.image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  res.json(note);
});

// DELETE
app.delete("/notes/:id", async (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const note = notes[index];

  if (note.image?.public_id) {
    await cloudinary.uploader.destroy(note.image.public_id);
  }

  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
});

// LISTEN (HANYA SEKALI)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
