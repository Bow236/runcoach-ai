# RunCoach AI

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

