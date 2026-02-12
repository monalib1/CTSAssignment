# Event Booking System

A full-stack web application for booking events from pre-defined calendar slots. Users can browse available events, select dates, book their preferred events, and manage their bookings.

## 🎯 Features

- **Interactive Calendar**: Browse events by month with an intuitive calendar interface
- **Event Browsing**: View all available events with details like date, time, location, and capacity
- **Easy Booking**: Book events by providing name and email
- **Booking Management**: View, search, and cancel your bookings
- **Real-time Updates**: Available slots update in real-time after booking
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth interactions

## 📋 Tech Stack

### Backend
- **Framework**: Flask 2.3
- **Database**: SQLite with SQLAlchemy ORM
- **API**: RESTful API with CORS support
- **Language**: Python 3.8+

### Frontend
- **Framework**: Angular 16+
- **Language**: TypeScript
- **Styling**: CSS with modern design patterns
- **HTTP Client**: Angular HttpClient

## 📁 Project Structure

```
event-booking/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app initialization
│   │   ├── models.py            # Database models
│   │   └── routes.py            # API endpoints
│   ├── requirements.txt          # Python dependencies
│   ├── run.py                    # Backend entry point
│   └── seed_data.py              # Sample data seeding
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # Angular components
│   │   │   ├── services/         # Services
│   │   │   ├── app.module.ts     # Main module
│   │   │   ├── app.component.ts  # Main component
│   │   │   └── app.component.html
│   │   ├── main.ts               # Angular bootstrap
│   │   ├── index.html            # HTML template
│   │   └── styles.css            # Global styles
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── tsconfig.app.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm 8+
- Git

### Backend Setup

#### 1. Navigate to backend directory
```bash
cd backend
```

#### 2. Create a Python virtual environment
```bash
python -m venv venv
```

#### 3. Activate the virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### 4. Install Python dependencies
```bash
pip install -r requirements.txt
```

#### 5. Seed the database with sample data
```bash
python seed_data.py
```

You should see output like:
```
✓ Seeded 6 event slots
```

#### 6. Start the backend server
```bash
python run.py
```

The backend API will be available at:
```
http://localhost:5000
```

You'll see output:
```
Starting Event Booking Backend API...
API available at http://localhost:5000
 * Running on http://0.0.0.0:5000
```

### Frontend Setup

#### 1. In a new terminal, navigate to frontend directory
```bash
cd frontend
```

#### 2. Install npm dependencies
```bash
npm install
```

#### 3. Start the development server
```bash
npm start
```

Or use:
```bash
ng serve
```

The frontend will be available at:
```
http://localhost:4200
```

## 📡 API Endpoints

### Event Slots

#### Get all event slots
```
GET /api/slots
```

#### Get a specific event slot
```
GET /api/slots/<id>
```

#### Create a new event slot (Admin)
```
POST /api/slots
Content-Type: application/json

{
  "title": "Web Development Workshop",
  "description": "Learn modern web development",
  "start_time": "2026-02-12T09:00:00",
  "end_time": "2026-02-12T11:00:00",
  "capacity": 30,
  "location": "Virtual Meeting Room A"
}
```

#### Update an event slot
```
PUT /api/slots/<id>
Content-Type: application/json
```

#### Delete an event slot
```
DELETE /api/slots/<id>
```

### Bookings

#### Get all bookings (or filter by user email)
```
GET /api/bookings
GET /api/bookings?user_email=user@example.com
```

#### Get a specific booking
```
GET /api/bookings/<id>
```

#### Create a new booking
```
POST /api/bookings
Content-Type: application/json

{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "event_slot_id": 1
}
```

#### Update booking status
```
PUT /api/bookings/<id>
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Cancel a booking
```
DELETE /api/bookings/<id>
```

#### Health check
```
GET /api/health
```

## 💾 Database Models

### EventSlot
- `id`: Primary key
- `title`: Event title
- `description`: Event description
- `start_time`: Event start datetime
- `end_time`: Event end datetime
- `capacity`: Maximum number of attendees
- `location`: Event location
- `created_at`: Creation timestamp

### Booking
- `id`: Primary key
- `user_name`: Attendee name
- `user_email`: Attendee email
- `event_slot_id`: Foreign key to EventSlot
- `booking_date`: Booking timestamp
- `status`: Booking status (confirmed/cancelled)

## 🎨 UI Components

### CalendarComponent
- Interactive monthly calendar
- Date selection
- Events filtered by selected date
- Events list with availability
- Navigation between months

### BookingFormComponent
- Selected event display
- User information input
- Form validation
- Booking submission
- Success/error messages

### MyBookingsComponent
- List of user bookings
- Search by email
- Booking status display
- Cancel booking functionality

## 🧪 Testing the Application

### 1. Start both backend and frontend (as described above)

### 2. Access the application
Open your browser and navigate to:
```
http://localhost:4200
```

### 3. Book an event
- Click on a date in the calendar
- Select an available event
- Fill in your name and email
- Click "Confirm Booking"

### 4. View your bookings
- Click "View My Bookings" button
- Use the search feature to find bookings by email
- Cancel bookings as needed

### 5. Test the API directly
Use curl or Postman to test the API:

```bash
# Get all event slots
curl http://localhost:5000/api/slots

# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"user_name":"Jane Doe","user_email":"jane@example.com","event_slot_id":1}'

# Get user bookings
curl "http://localhost:5000/api/bookings?user_email=jane@example.com"
```

## 🔧 Configuration

### Backend Configuration
- **Database**: SQLite at `backend/events.db`
- **CORS**: Enabled for frontend on localhost:4200
- **Port**: 5000
- **Debug Mode**: Enabled

To disable debug mode, edit `backend/run.py`:
```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

### Frontend Configuration
- **API URL**: `http://localhost:5000/api`
- **Port**: 4200
- **Build output**: `frontend/dist/event-booking`

To change the API URL, edit `frontend/src/app/services/event.service.ts`:
```typescript
private apiUrl = 'http://your-api-url/api';
```

## 📦 Building for Production

### Backend
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with a production WSGI server
pip install gunicorn
gunicorn app:app
```

### Frontend
```bash
ng build --configuration production
```

This creates optimized files in `frontend/dist/event-booking/`

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed: `python --version`
- Check if port 5000 is already in use: `netstat -an | grep 5000`
- Verify all dependencies installed: `pip list`

### Frontend won't compile
- Clear node_modules: `rm -rf node_modules && npm install`
- Ensure Node 16+: `node --version`
- Check TypeScript version: `npx tsc --version`

### Booking fails with CORS error
- Ensure backend is running on `http://localhost:5000`
- Check that CORS is enabled in `backend/app/__init__.py`

### No events showing
- Ensure you've run `python seed_data.py` in the backend directory
- Check the browser console for API errors
- Verify both backend and frontend are running

## 📝 Sample Data

The application comes with 6 pre-seeded events:
1. Morning Webinar: Introduction to Web Development
2. Afternoon Workshop: Advanced Python
3. Evening Networking Event
4. SQL Database Design Masterclass
5. Cloud Computing Essentials
6. DevOps and CI/CD Pipeline Setup

Each event has:
- Unique date and time
- Description
- Location
- Capacity (25-100 attendees)

Run `python seed_data.py` to populate these events.

## 🔐 Security Considerations

For production deployment:
- Enable authentication and authorization
- Use environment variables for sensitive config
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use HTTPS for all communications
- Implement email verification for bookings
- Add booking confirmation tokens

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the console/terminal output for errors
3. Check browser developer console (F12)
4. Review API responses in Network tab

## 📄 License

This project is provided as-is for educational and commercial use.

## 🎉 Next Steps

Potential enhancements:
- User authentication and profiles
- Email notifications
- Payment integration
- Admin dashboard
- Event analytics
- Multi-language support
- Calendar synchronization (Google Calendar, Outlook)
- Mobile app
- Real-time notifications via WebSockets
