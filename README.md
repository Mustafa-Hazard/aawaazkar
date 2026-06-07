# AawaazKar — آواز کر
### Karachi Civic Issue Reporting Platform
> ZABEFEST Hackathon 2026 — Building a Better World for the Future

## Problem
Karachi citizens have no efficient way to report, track, or verify civic issues like potholes, garbage overflow, water shortages, and broken streetlights.

## Solution
AawaazKar is a real-time civic reporting platform where citizens report issues, an AI engine prioritizes them by urgency, and authorities resolve them transparently.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** NestJS + TypeORM
- **Database:** PostgreSQL (Docker)
- **Containerization:** Docker + docker-compose

## Features
- Citizen issue reporting with photo + GPS
- AI Priority Scoring Engine (auto-calculates urgency 0-100)
- Live heatmap of issues across Karachi (Leaflet.js)
- Public transparency dashboard with real-time stats
- Crowdsourced verification (upvote system)
- Admin panel with JWT authentication
- Urdu language support
- Offline-ready architecture

## Hackathon Components Covered
1. Citizen issue reporting system
2. Geo-tagging and location intelligence
3. Smart prioritization (AI scoring)
4. Public transparency dashboard
5. Crowdsourced verification
6. Data analytics and heatmap visualization
7. Admin management workflow

## Sustainability
- Environmental: Garbage, flood, air quality tracking
- Social: Citizen empowerment, public safety
- Economic: Reduces city repair costs via early detection

## Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop

### Run with Docker
```bash
docker-compose up -d
```

### Run Backend
```bash
cd backend
npm install
npm run start:dev
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin Login
- Username: `admin`
- Password: `aawaazkar`

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/reports | Get all reports |
| POST | /api/reports | Submit new report |
| PATCH | /api/reports/:id/status | Update status |
| PATCH | /api/reports/:id/upvote | Upvote report |
| GET | /api/reports/stats | Get statistics |
| POST | /api/auth/login | Admin login |

## Team
SZABIST Karachi — ZABEFEST Hackathon 2026