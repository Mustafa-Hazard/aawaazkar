# AawaazKar

Karachi civic issue reporting web app with location tagging, priority scoring, and bilingual support.

<!-- add screenshot here -->

## About
AawaazKar is a web application built for the ZABEFEST Hackathon 2026 to help residents in Karachi report municipal issues like water shortages, broken streetlights, potholes, and garbage accumulation. The app calculates an urgency score for each report using issue category weighting and keyword checks in the report text. Community members can upvote existing reports to increase their urgency score, helping municipal staff identify urgent infrastructure problems. The user interface includes an Urdu language toggle to improve accessibility for local citizens.

<!-- add placement -->

## Features
- **Citizen Report Submission:** Citizens submit reports with a title, category, description, and interactive map location using Leaflet.
- **Rule-Based Urgency Scoring:** Backend calculates a 0–100 urgency score using base category weights (safety: 40, water/flood: 35, road: 25, sanitation: 20, other: 15) and adds 10 points for each matching urgent keyword (`emergency`, `urgent`, `critical`, `dangerous`, `broken`, `no water`, `flood`).
- **Priority Classification:** Reports automatically classify into Critical (>= 70), High (>= 45), Medium (>= 25), or Low (< 25).
- **Crowdsourced Verification:** Community upvotes increase the report urgency score by +2 points per vote (capped at 100) and recalculate priority level.
- **Public Dashboard:** View active complaints categorized into Pending, In Progress, and Resolved status cards, with counters for total and critical reports.
- **Admin Management Panel:** Protected JWT routes allow municipal staff to review reports and transition status between Pending, In Progress, and Resolved.
- **Bilingual Interface:** English and Urdu language toggle built with i18next.

## Tech Stack
*Stack verified from `backend/package.json` and `frontend/package.json`. GitHub displays JavaScript for the repository because the frontend components and configuration files are written in JavaScript/JSX, while the backend is written in TypeScript.*

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, JavaScript (JSX), Vite 8, Tailwind CSS 4, React Router 7, Leaflet, React-Leaflet, Axios, i18next |
| **Backend** | NestJS 11, TypeScript, TypeORM 0.3, PostgreSQL (`pg` 8.21), Passport, Passport JWT, Bcrypt |
| **Database & Tools** | PostgreSQL 16 (Docker Compose), Docker |

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- Docker and Docker Compose

### 1. Start Database
From the project root:
```bash
docker compose up -d
```

### 2. Start Backend API
```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```
The NestJS API runs on `http://localhost:3000/api`.

### 3. Start Frontend App
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The Vite frontend runs on `http://localhost:5173`.

### Environment Variables

| Variable | Description | Example Placeholder |
|---|---|---|
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port mapped by Docker | `5433` |
| `DATABASE_USER` | PostgreSQL user | `aawaazkar` |
| `DATABASE_PASSWORD` | PostgreSQL password | `your_db_password` |
| `DATABASE_NAME` | PostgreSQL database name | `aawaazkar` |
| `JWT_SECRET` | Secret key for signing admin tokens | `your_jwt_secret` |
| `PORT` | Backend application port | `3000` |

## Project Structure
```text
aawaazkar/
├── backend/
│   ├── src/
│   │   ├── auth/          # JWT strategy, auth guards, admin service
│   │   ├── reports/       # Report entity, scoring service, controller
│   │   └── app.module.ts  # Root application module
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, ReportCard, MapPicker
│   │   ├── pages/         # Home, AdminLogin, SubmitReport
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── docker-compose.yml     # PostgreSQL service definition
```

## What I Learned & What I Would Improve
- Built end-to-end integration between NestJS and React with JWT authentication and TypeORM entity relations.
- Implemented geographic coordinate selection in React using Leaflet and stored coordinates in PostgreSQL.
- Future improvements: add image file upload storage (e.g. S3/Cloudinary) for photo proof, add automated test coverage for backend services, and optimize frontend bundle size.

## Author
**Mustafa Muhammad Iqbal** — [GitHub](https://github.com/Mustafa-Hazard) · [LinkedIn](https://linkedin.com/in/mustafa642)
