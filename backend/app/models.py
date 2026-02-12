from app import db
from datetime import datetime

class EventSlot(db.Model):
    """Represents a pre-defined event slot"""
    __tablename__ = 'event_slots'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    capacity = db.Column(db.Integer, default=1)
    location = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='event_slot', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'capacity': self.capacity,
            'location': self.location,
            'available_slots': self.capacity - len(self.bookings)
        }

class Booking(db.Model):
    """Represents a user booking for an event slot"""
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    user_email = db.Column(db.String(100), nullable=False)
    event_slot_id = db.Column(db.Integer, db.ForeignKey('event_slots.id'), nullable=False)
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='confirmed')  # confirmed, cancelled
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'user_email': self.user_email,
            'event_slot_id': self.event_slot_id,
            'event_title': self.event_slot.title if self.event_slot else None,
            'event_start_time': self.event_slot.start_time.isoformat() if self.event_slot else None,
            'booking_date': self.booking_date.isoformat(),
            'status': self.status
        }
