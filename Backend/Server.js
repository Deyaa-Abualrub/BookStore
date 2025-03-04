const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Get all books
app.get("/book", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { title, author, genre, description_ } = req.body;

    const result = await pool.query(
      "INSERT INTO books (title, author, genre, description_) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, author, genre, description_]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding book:", err); // Detailed error log
    res.status(500).json({ error: err.message });
  }
});

// Update book
app.put("/book/:id", async (req, res) => {
  try {
    const { title, author, genre, description_ } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, genre = $3, description_ = $4 WHERE id = $5 RETURNING *",
      [title, author, genre, description_, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete book
app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 2999;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
