import { Component } from '@angular/core';
import { EventService, EventSlot } from '../services/event.service';

@Component({
  selector: 'app-admin-timeslot',
  templateUrl: './admin-timeslot.component.html',
  styleUrls: ['./admin-timeslot.component.css']
})
export class AdminTimeslotComponent {
  slot: Partial<EventSlot> = {
    title: '',
    category: '',
    description: '',
    start_time: '',
    end_time: '',
    capacity: 1,
    location: ''
  };
  message = '';
  messageType: 'success' | 'error' | '' = '';
  isSubmitting = false;

  constructor(private eventService: EventService) {}

  submitSlot() {
    if (!this.slot.title || !this.slot.category || !this.slot.start_time || !this.slot.end_time || !this.slot.capacity) {
      this.message = 'Please fill in all required fields.';
      this.messageType = 'error';
      return;
    }
    this.isSubmitting = true;
    this.eventService.createEventSlot(this.slot).subscribe({
      next: () => {
        this.message = 'Timeslot created successfully!';
        this.messageType = 'success';
        this.isSubmitting = false;
        this.slot = { title: '', category: '', description: '', start_time: '', end_time: '', capacity: 1, location: '' };
      },
      error: (err) => {
        this.message = err.error?.error || 'Failed to create timeslot.';
        this.messageType = 'error';
        this.isSubmitting = false;
      }
    });
  }
}
