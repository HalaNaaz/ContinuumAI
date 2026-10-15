# ContinuumAI — Local Development & Setup Guide

This guide details how to spin up FalkorDB, the FastAPI backend, and the Next.js frontend locally.

---

## 1. Quickstart with Docker Compose

The fastest way to launch the complete system (FalkorDB + Backend + Frontend):

```bash
docker compose up --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **FalkorDB:** `localhost:6379`

---

## 2. Manual Local Setup (Step-by-Step)

### Step 1: Start FalkorDB
Run FalkorDB locally in a lightweight Docker container:
```bash
docker run -p 6379:6379 -it --rm falkordb/falkordb:latest
```

### Step 2: Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `FALKORDB_HOST=localhost` and `FALKORDB_PORT=6379`.

### Step 3: Start the Backend (FastAPI)
```bash
cd backend
python -m venv venv

# Activate Virtual Environment:
# On Windows:
.\venv\Scripts\activate
# On Linux / macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Verify health: [http://localhost:8000/api/health](http://localhost:8000/api/health).

### Step 4: Start the Frontend (Next.js)
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 3. Running Backend Tests

Run the test suite using pytest:

```bash
cd backend
# Unit and isolation tests:
pytest -v

# Live FalkorDB integration tests (requires Docker container on 6379):
pytest -m integration -v
```

---

## 4. Replaying the Signature Workflow

1. Navigate to [http://localhost:3000/app](http://localhost:3000/app).
2. Click **"Run Session 1 (Agent A)"** to investigate and persist finding `mem-001` to FalkorDB.
3. Click **"Run Session 2 (Agent B)"** to launch a separate session that retrieves `mem-001` from FalkorDB and resolves the task.
4. Open the **Memory Graph** (`/app/graph`) to inspect the real graph nodes and `RELATES_TO` relationship edges.
