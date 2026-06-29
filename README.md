# AawaazKar — آواز کر
### Karachi Civic Issue Reporting & Smart Prioritization Platform
*ZABEFEST Hackathon 2026 — Building a Better World for the Future*

---

## 🚀 Problem & Solution

### The Problem
Karachi citizens have no efficient, transparent way to report, track, or verify localized civic infrastructure breakdowns—such as severe potholes, garbage overflows, water shortages, or broken streetlights. Critical issues are often lost in paperwork or delayed by lack of structural urgency analytics.

### The Solution
**AawaazKar** is a real-time civic reporting platform where citizens pin and submit issues directly. The platform utilizes a **Weighted Urgency Scoring Algorithm** to instantly categorize reports by priority, allowing municipal authorities to review, update, and resolve infrastructure issues transparently.

---

## 🛠️ Tech Stack

*   **Frontend:** React + Vite + Tailwind CSS
*   **Backend:** NestJS + TypeORM (with Passport JWT Auth)
*   **Database:** PostgreSQL (Dockerized)
*   **Containerization:** Docker + Docker Compose

---

## ✨ Features Built

*   **Citizen Issue Reporting:** Simplified submission form with category selection, description, and location tagging.
*   **Smart Priority Scoring Engine:** A rules-based urgency calculator (0-100) that weights category severity against specific high-urgency keywords in the citizen's description.
*   **Crowdsourced Verification:** An upvote system where community verification progressively bumps up the issue score and urgency status (+2 points per upvote).
*   **Public Transparency Dashboard:** Real-time breakdown charts counting Total, Pending, In Progress, and Resolved complaints.
*   **Secure Admin Panel:** Protected queue view where authorized personnel use JWT authentication to safely change issue lifecycle states (`Start` / `Resolve`).
*   **Urdu Language Support:** Bilingual interface toggle supporting local language usability.

---

## 🏃‍♂️ How to Run the Project

Follow these steps to spin up the database, backend, and frontend environments locally.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v20+ recommended)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

### Step 1: Start the Database (Docker)
The database runs isolated in a Docker container mapped to host port `5433` to prevent conflicts with local database engines.

1. Open a terminal at the root directory of the project.
2. Run the following command to start the database in detached mode:
   ```bash
   docker compose up -d

```

3. *(Optional)* Verify that the container is healthy:
```bash
docker ps

```



---

### Step 2: Configure & Run the Backend

1. Navigate into the backend directory:
```bash
cd backend

```


2. Create your local environment file by copying the template:
```bash
cp .env.example .env

```


3. Open the newly created `backend/.env` file and verify or update the variables to match your configuration. For example:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=aawaazkar
DATABASE_PASSWORD=aawaazkar123
DATABASE_NAME=aawaazkar
JWT_SECRET=superSecretHackathonKey2026

```


4. Install the NestJS and Passport dependencies:
```bash
npm install

```


5. Spin up the NestJS server in development mode:
```bash
npm run start:dev

```


The backend API will be live at `http://localhost:3000/api`.

---

### Step 3: Configure & Run the Frontend

1. Open a new terminal window and navigate into the frontend directory:
```bash
cd frontend

```


2. Install the React application dependencies (including routing and utility components):
```bash
npm install

```


3. Run the Vite development server:
```bash
npm run dev

```


4. Open your browser and navigate to the local address displayed in your terminal (typically `http://localhost:5173/`).

---

## 🔐 Credentials & Demo Testing

### Admin Access

To access the protected management features, use the default administrator credentials inside the app or when making authenticated API requests:

* **Username:** `admin`
* **Password:** `aawaazkar`

### Testing Status Changes via cURL

If you want to manually execute a status mutation bypass test on a report via your terminal, send the `access_token` inside the authorization header:

```bash
curl -X PATCH http://localhost:3000/api/reports/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"status":"Resolved"}'

```

---

## 👥 Team

* **SZABIST Karachi** — ZABEFEST Hackathon 2026

```

```
