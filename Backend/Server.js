const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const corsOption = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(cors(corsOption));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/book", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM book_catalog");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: err.message });
  }
});

let PORT = 2999;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
