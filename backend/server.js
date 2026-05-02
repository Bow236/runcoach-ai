const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const runs = [
  {
    id: 1,
    distance: 5.2,
    duration: 30,
    bpm: 170,
    pace: "5:45/km",
    score: 6.5
  }
];

app.get("/", (req, res) => {
  res.json({ message: "RunCoach AI backend is running 🚀" });
});

app.get("/runs", (req, res) => {
  res.json(runs);
});

app.post("/runs", (req, res) => {
  const newRun = {
    id: runs.length + 1,
    distance: req.body.distance,
    duration: req.body.duration,
    bpm: req.body.bpm,
    pace: req.body.pace || null,
    score: null
  };

  runs.push(newRun);
  res.status(201).json(newRun);
});

app.get("/runs/:id", (req, res) => {
  const run = runs.find((r) => r.id === Number(req.params.id));

  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }

  res.json(run);
});

app.post("/runs/:id/diagnosis", (req, res) => {
  const run = runs.find((r) => r.id === Number(req.params.id));

  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }

  const diagnosis = {
    score: 8,
    strengths: ["Good consistency"],
    weaknesses: [],
    recommendations: []
  };

  if (run.bpm > 170) {
    diagnosis.weaknesses.push("Heart rate is too high");
    diagnosis.recommendations.push("Slow down at the beginning of the run");
  }

  if (run.duration > 45) {
    diagnosis.strengths.push("Good endurance");
  }

  if (run.distance >= 5) {
    diagnosis.strengths.push("Good running distance");
  }

  if (diagnosis.weaknesses.length === 0) {
    diagnosis.recommendations.push("Keep a stable pace");
  }

  res.json(diagnosis);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
