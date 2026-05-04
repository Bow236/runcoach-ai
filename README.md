# RunCoach AI

## Project Overview

RunCoach AI is a mobile-first web application designed to help runners track their performance and receive basic AI-powered feedback.

The application allows users to:
- Add running sessions (distance, duration, heart rate)
- View their history
- Get performance analysis and recommendations

---

## Value Proposition

RunCoach AI provides a simple coaching tool for beginner and intermediate runners.

Instead of complex fitness platforms, this application focuses on:
- Simplicity
- Fast data entry
- Instant feedback

---

## User Stories

- As a user, I want to add a run quickly so I can track my activity.
- As a user, I want to see my previous runs.
- As a user, I want an analysis of my performance.
- As a user, I want a mobile-friendly interface.

---

##  Wireframes

Wireframes were created to design a mobile-first interface with 5 main screens:

- Home
- Add Run
- History
- AI Analysis
- Profile

The interface is designed to resemble a mobile application.

---

##  Architecture

### Frontend
- HTML
- CSS
- JavaScript
- Mobile-first design
- No component framework used because the prototype is simple and does not require reusable UI components.

### Backend
- Node.js
- Express
- REST API

### Database
- PostgreSQL hosted on Neon

---

##  API Design

The backend is structured using separated layers:

- `routes/` handles HTTP requests
- `services/` contains business logic and database access

### Endpoints

- `GET /runs` → retrieve all runs
- `POST /runs` → create a run
- `GET /runs/:id` → retrieve one run
- `POST /runs/:id/diagnosis` → generate performance analysis

---

## Database

The application uses PostgreSQL.

### Main table: `runs`

Fields:
- `id`
- `distance`
- `duration`
- `bpm`
- `pace`
- `score`
- `source`
- `created_at`

---

##  Data / SID

No initial dataset is required.

Users create their own data through the application interface.

---

##  Authentication

Authentication is not implemented in this prototype.

Reason:
- The project focuses on the main full-stack functionality.
- No personal account management is required for this version.

---

##  Security

Security measures:
- Environment variables are used for secrets.
- `DATABASE_URL` is stored in Vercel environment variables.
- `.env` is not pushed to GitHub.
- CORS is enabled.
- Basic input validation is implemented.
- No database password is stored directly in the source code.

---

## 📈 Observability

Basic server-side logging is implemented.

Example:

```js
console.log("[INFO] GET /runs");
console.error("[ERROR]", err);
