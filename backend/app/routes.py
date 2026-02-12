from flask import Blueprint, request, jsonify
events_bp = Blueprint('events', __name__, url_prefix='/api')
from app import db
from app.models import EventSlot, Booking
from datetime import datetime

events_bp = Blueprint('events', __name__, url_prefix='/api')

# ==================== EVENT CATEGORY FILTER ====================

@events_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all unique event categories"""
    categories = db.session.query(EventSlot.category).distinct().all()
    # Flatten and remove empty categories
    category_list = sorted(set([c[0] for c in categories if c[0]]))
    return jsonify(category_list), 200

# ==================== EVENT SLOTS ====================

@events_bp.route('/slots', methods=['GET'])
def get_slots():
    """Get all available event slots"""
    slots = EventSlot.query.all()
    return jsonify([slot.to_dict() for slot in slots]), 200

@events_bp.route('/slots/<int:slot_id>', methods=['GET'])
def get_slot(slot_id):
    """Get a specific event slot"""
    slot = EventSlot.query.get(slot_id)
    if not slot:
        return jsonify({'error': 'Slot not found'}), 404
    return jsonify(slot.to_dict()), 200

@events_bp.route('/slots', methods=['POST'])
def create_slot():
    """Create a new event slot (admin function)"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'start_time', 'end_time', 'capacity']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        slot = EventSlot(
            title=data['title'],
            category=data.get('category', ''),
            description=data.get('description', ''),
            start_time=datetime.fromisoformat(data['start_time']),
            end_time=datetime.fromisoformat(data['end_time']),
            capacity=data['capacity'],
            location=data.get('location', '')
        )
        db.session.add(slot)
        db.session.commit()
        return jsonify(slot.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/slots/<int:slot_id>', methods=['PUT'])
def update_slot(slot_id):
    """Update an event slot"""
    slot = EventSlot.query.get(slot_id)
    if not slot:
        return jsonify({'error': 'Slot not found'}), 404
    
    data = request.get_json()
    
    try:
        if 'title' in data:
            slot.title = data['title']
        if 'category' in data:
            slot.category = data['category']
        if 'description' in data:
            slot.description = data['description']
        if 'start_time' in data:
            slot.start_time = datetime.fromisoformat(data['start_time'])
        if 'end_time' in data:
            slot.end_time = datetime.fromisoformat(data['end_time'])
        if 'capacity' in data:
            slot.capacity = data['capacity']
        if 'location' in data:
            slot.location = data['location']
        db.session.commit()
        return jsonify(slot.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/slots/<int:slot_id>', methods=['DELETE'])
def delete_slot(slot_id):
    """Delete an event slot"""
    slot = EventSlot.query.get(slot_id)
    if not slot:
        return jsonify({'error': 'Slot not found'}), 404
    
    try:
        db.session.delete(slot)
        db.session.commit()
        return jsonify({'message': 'Slot deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== BOOKINGS ====================

@events_bp.route('/bookings', methods=['GET'])
def get_bookings():
    """Get all bookings (filtered by user email if provided)"""
    user_email = request.args.get('user_email')
    
    if user_email:
        bookings = Booking.query.filter_by(user_email=user_email).all()
    else:
        bookings = Booking.query.all()
    
    return jsonify([booking.to_dict() for booking in bookings]), 200

@events_bp.route('/bookings/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Get a specific booking"""
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    return jsonify(booking.to_dict()), 200

@events_bp.route('/bookings', methods=['POST'])
def create_booking():
    """Create a new booking"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['user_name', 'user_email', 'event_slot_id']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if slot exists
    slot = EventSlot.query.get(data['event_slot_id'])
    if not slot:
        return jsonify({'error': 'Event slot not found'}), 404

    # Enforce only one user per slot
    current_bookings = Booking.query.filter_by(
        event_slot_id=data['event_slot_id'],
        status='confirmed'
    ).count()
    if current_bookings >= 1:
        return jsonify({'error': 'This slot is already booked by another user'}), 400

    # Check if slot has available capacity
    current_bookings = Booking.query.filter_by(
        event_slot_id=data['event_slot_id'],
        status='confirmed'
    ).count()
    
    if current_bookings >= slot.capacity:
        return jsonify({'error': 'No available slots for this event'}), 400
    
    try:
        booking = Booking(
            user_name=data['user_name'],
            user_email=data['user_email'],
            event_slot_id=data['event_slot_id']
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify(booking.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/bookings/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    """Update a booking status"""
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    data = request.get_json()
    
    try:
        if 'status' in data:
            booking.status = data['status']
        
        db.session.commit()
        return jsonify(booking.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/bookings/<int:booking_id>', methods=['DELETE'])
def cancel_booking(booking_id):
    """Cancel a booking"""
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    try:
        booking.status = 'cancelled'
        db.session.commit()
        return jsonify({'message': 'Booking cancelled successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200
