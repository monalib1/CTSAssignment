"""Script to seed the database with sample event slots"""
import os
from datetime import datetime, timedelta
from app import create_app, db
from app.models import EventSlot

app = create_app()

def seed_data():
    with app.app_context():
        # Clear existing data
        from app.models import Booking
        Booking.query.filter_by(user_email='monalibansod7789@gmail.com').delete()
        EventSlot.query.delete()
        db.session.commit()
        
        # Create sample event slots
        base_date = datetime.now()
        
        slots = [
            EventSlot(
                title='Interview for Python',
                category='Interview for Python',
                description='Technical interview slot for Python developer candidates',
                start_time=base_date.replace(hour=9, minute=0),
                end_time=base_date.replace(hour=10, minute=0),
                location='Virtual Meeting Room A'
            ),
            EventSlot(
                title='Interview for python developer',
                category='Interview for python developer',
                description='Technical interview slot for Python developer candidates',
                start_time=base_date.replace(hour=11, minute=0),
                end_time=base_date.replace(hour=12, minute=0),
                location='Virtual Meeting Room B'
            ),
            EventSlot(
                title='Interview for SQL',
                category='Interview for SQL',
                description='Technical interview slot for SQL/database candidates',
                start_time=base_date.replace(hour=14, minute=0),
                end_time=base_date.replace(hour=15, minute=0),
                location='Virtual Auditorium'
            ),
            EventSlot(
                title='Interview for Cloud',
                category='Interview for Cloud',
                description='Technical interview slot for cloud computing candidates',
                start_time=(base_date + timedelta(days=1)).replace(hour=10, minute=0),
                end_time=(base_date + timedelta(days=1)).replace(hour=11, minute=0),
                location='Conference Room 1'
            ),
            EventSlot(
                title='Interview for DevOps',
                category='Interview for DevOps',
                description='Technical interview slot for DevOps candidates',
                start_time=(base_date + timedelta(days=2)).replace(hour=13, minute=0),
                end_time=(base_date + timedelta(days=2)).replace(hour=14, minute=0),
                location='Conference Room 2'
            ),
            EventSlot(
                title='Interview for Dot net',
                category='Interview for Dot net',
                description='Technical interview slot for Dot net developer candidates',
                start_time=(base_date + timedelta(days=3)).replace(hour=10, minute=0),
                end_time=(base_date + timedelta(days=3)).replace(hour=11, minute=0),
                location='Conference Room 3'
            ),
        ]
        
        for slot in slots:
            db.session.add(slot)
        db.session.commit()
        print(f"✓ Seeded {len(slots)} event slots (no default bookings)")

if __name__ == '__main__':
    seed_data()
