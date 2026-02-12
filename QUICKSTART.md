# Quick Start Guide

Follow these steps to get the Event Booking System up and running in 5 minutes.

## Prerequisites
- Python 3.8+
- Node.js 16+
- Two terminal windows

## Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed sample data
python seed_data.py

# Start server
python run.py
```

**Expected output:**
```
Starting Event Booking Backend API...
API available at http://localhost:5000
 * Running on http://0.0.0.0:5000
```

## Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Expected output:**
```
✔ Compiled successfully.
✔ Built successfully.

 ⠋ Building...
```

## Access the Application

Open your browser and go to:
```
http://localhost:4200
```

## Basic Usage

1. **Browse Events**: The calendar shows available events by month
2. **Select Date/Event**: Click dates and events to filter
3. **Book Event**: Fill in your name and email, then click "Confirm Booking"
4. **View Bookings**: Click "View My Bookings" to see your reservations
5. **Cancel Booking**: Click "Cancel" on any confirmed booking

## API Health Check

Verify the backend is running:
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{"status": "healthy"}
```

## Stop the Servers

- Backend: Press `Ctrl+C` in Terminal 1
- Frontend: Press `Ctrl+C` in Terminal 2

## Troubleshooting

**Port already in use?**
- Backend (5000): `Change port in backend/run.py`
- Frontend (4200): `ng serve --port 4300`

**Module not found?**
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

**No events showing?**
- Run: `python backend/seed_data.py`

For detailed setup and API documentation, see README.md
