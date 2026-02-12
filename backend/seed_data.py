"""Script to seed the database with sample event slots"""
import os
from datetime import datetime, timedelta
from app import create_app, db
from app.models import EventSlot

app = create_app()

def seed_data():
    with app.app_context():
        # Clear existing data
        EventSlot.query.delete()
        db.session.commit()
        
        # Create sample event slots
        base_date = datetime.now()
        
        slots = [
            EventSlot(
                title='Morning Webinar: Introduction to Web Development',
                category='Webinar',
                description='Learn the basics of web development with HTML, CSS, and JavaScript',
                start_time=base_date.replace(hour=9, minute=0),
                end_time=base_date.replace(hour=11, minute=0),
                capacity=50,
                location='Virtual Meeting Room A'
            ),
            EventSlot(
                title='Afternoon Workshop: Advanced Python',
                category='Workshop',
                description='Deep dive into Python programming with hands-on exercises',
                start_time=base_date.replace(hour=14, minute=0),
                end_time=base_date.replace(hour=16, minute=30),
                capacity=30,
                location='Virtual Meeting Room B'
            ),
            EventSlot(
                title='Evening Networking Event',
                category='Networking',
                description='Connect with industry professionals and peers',
                start_time=base_date.replace(hour=18, minute=0),
                end_time=base_date.replace(hour=20, minute=0),
                capacity=100,
                location='Virtual Auditorium'
            ),
            EventSlot(
                title='SQL Database Design Masterclass',
                category='Masterclass',
                description='Master the art of designing scalable databases',
                start_time=(base_date + timedelta(days=1)).replace(hour=10, minute=0),
                end_time=(base_date + timedelta(days=1)).replace(hour=12, minute=0),
                capacity=40,
                location='Conference Room 1'
            ),
            EventSlot(
                title='Cloud Computing Essentials',
                category='Seminar',
                description='Understand AWS, Azure, and Google Cloud fundamentals',
                start_time=(base_date + timedelta(days=2)).replace(hour=13, minute=0),
                end_time=(base_date + timedelta(days=2)).replace(hour=15, minute=0),
                capacity=35,
                location='Conference Room 2'
            ),
            EventSlot(
                title='DevOps and CI/CD Pipeline Setup',
                category='Workshop',
                description='Learn to set up continuous integration and deployment',
                start_time=(base_date + timedelta(days=3)).replace(hour=9, minute=0),
                end_time=(base_date + timedelta(days=3)).replace(hour=11, minute=30),
                capacity=25,
                location='Lab 1'
            ),
        ]
        
        for slot in slots:
            db.session.add(slot)
        
        db.session.commit()
        print(f"✓ Seeded {len(slots)} event slots")

if __name__ == '__main__':
    seed_data()
