require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
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

/* =========================
   SERVE FRONTEND
========================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

/* =========================
   API ROUTES
========================= */

// GET all runs
app.get("/runs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM runs ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST add run=
app.post("/runs", async (req, res) => {
  try {
    const { distance, duration, bpm } = req.body;

    const result = await pool.query(
      `INSERT INTO runs (distance, duration, bpm, source)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [distance, duration, bpm, "manual"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert error" });
  }
});

// GET run by ID
app.get("/runs/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM runs WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Run not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching run" });
  }
});

// AI Diagnosis
app.post("/runs/:id/diagnosis", async (req, res) => {
  try {
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
      diagnosis.weaknesses.push("Heart rate too high");
      diagnosis.recommendations.push("Slow down");
    }

    if (run.distance >= 5) {
      diagnosis.strengths.push("Good distance");
    }

    if (run.duration > 30) {
      diagnosis.strengths.push("Good endurance");
    }

    res.json(diagnosis);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

/* =========================
   START SERVER (LOCAL ONLY)
========================= */

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// export pour Vercel
module.exports = app;
