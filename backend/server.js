require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connexion
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("DB connected:", res.rows);
  }
});

/* =========================
   CREATE TABLE (AUTO)
========================= */

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS runs (
      id SERIAL PRIMARY KEY,
      distance FLOAT,
      duration INT,
      bpm INT,
      pace TEXT,
      score FLOAT,
      source TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createTable();

/* =========================
   ROUTES
========================= */

// Home
app.get("/", (req, res) => {
  res.json({ message: "RunCoach AI backend is running 🚀" });
});

// GET all runs
app.get("/runs", async (req, res) => {
  const result = await pool.query("SELECT * FROM runs ORDER BY id DESC");
  res.json(result.rows);
});

// POST add run
app.post("/runs", async (req, res) => {
  const { distance, duration, bpm } = req.body;

  const result = await pool.query(
    `INSERT INTO runs (distance, duration, bpm, source)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [distance, duration, bpm, "manual"]
  );

  res.status(201).json(result.rows[0]);
});

// GET run by ID
app.get("/runs/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM runs WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Run not found" });
  }

  res.json(result.rows[0]);
});

// AI Diagnosis
app.post("/runs/:id/diagnosis", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM runs WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Run not found" });
  }

  const run = result.rows[0];

  let diagnosis = {
    score: 8,
    strengths: [],
    weaknesses: [],
    recommendations: []
  };

  if (run.bpm > 170) {
    diagnosis.weaknesses.push("Heart rate is too high");
    diagnosis.recommendations.push("Slow down at the beginning");
  }

  if (run.duration > 45) {
    diagnosis.strengths.push("Good endurance");
  }

  if (run.distance >= 5) {
    diagnosis.strengths.push("Good distance");
  }

  if (diagnosis.weaknesses.length === 0) {
    diagnosis.recommendations.push("Maintain a stable pace");
  }

  res.json(diagnosis);
});

/* =========================
   START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
