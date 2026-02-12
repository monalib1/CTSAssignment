# Environment Configuration

This file contains configuration settings for the Event Booking System.

## Backend Environment Variables (Optional)

Create a `.env` file in the `backend/` directory:

```
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_URL=sqlite:///events.db
API_PORT=5000
API_HOST=0.0.0.0
CORS_ORIGINS=http://localhost:4200
```

## Frontend Environment Configuration

Edit `frontend/src/app/services/event.service.ts` to change the API URL:

```typescript
private apiUrl = 'http://localhost:5000/api';
```

## Production Configuration

### Backend Production (.env)
```
FLASK_ENV=production
FLASK_DEBUG=False
DATABASE_URL=postgresql://user:password@localhost/eventdb
API_PORT=5000
CORS_ORIGINS=https://yourdomain.com
```

### Frontend Production Build
```bash
ng build --configuration production
```

Edit `angular.json` for production settings:
```json
"production": {
  "outputHashing": "all",
  "optimization": true,
  "buildOptimizer": true
}
```

## Database Configuration

SQLite (Default):
```
sqlite:///events.db
```

PostgreSQL (Production):
```
postgresql://username:password@localhost:5432/eventdb
```

Update in `backend/app/__init__.py`:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
```

## CORS Configuration

Edit `backend/app/__init__.py`:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:4200"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```
