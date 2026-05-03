# RunCoach AI

RunCoach AI is a running tracking application that allows users to add their runs and receive AI-based performance analysis.

---

## Features

- Add running sessions (distance, duration, BPM)
- View runs history
- Analyze performance with AI-like logic
- Display strengths, weaknesses and recommendations
- Dynamic frontend connected to a backend API

---

## Architecture

The application follows a simple client-server architecture:

Frontend → Backend → Analysis

- Frontend: HTML, JavaScript
- Backend: Node.js, Express
- API: REST (GET, POST)

---

## API Routes

- `GET /runs` → retrieve all runs  
- `POST /runs` → add a new run  
- `GET /runs/:id` → get a specific run  
- `POST /runs/:id/diagnosis` → analyze a run  

---

## How to run the project

### 1. Start the backend

```bash
cd backend
node server.js# RunCoach AI

A running tracking application with AI-based performance analysis.

## Features

- Add running sessions
- View runs history
- Analyze performance using AI logic
- Dynamic frontend connected to backend API

## Architecture

Frontend → Backend → Analysis

- Frontend: HTML, JavaScript
- Backend: Node.js, Express
- API: REST (GET, POST)

## API Routes

- GET /runs → get all runs
- POST /runs → add a run
- GET /runs/:id → get run details
- POST /runs/:id/diagnosis → analyze run

## How to run the project

### Backend

```bash
cd backend
node server.js

## Future improvements

- Add PostgreSQL database with Neon
- Deploy the backend on Vercel
- Add Garmin integration in a future version
- Replace rule-based diagnosis with a real AI model

```bash
cd frontend
xdg-open index.html

Project goal

This project aims to help runners imprive their performance by providing simple AI-based feedback based on their running data.

