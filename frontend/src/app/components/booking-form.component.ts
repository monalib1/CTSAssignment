import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EventSlot } from '../services/event.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  @Input() selectedSlot: EventSlot | null = null;
  @Output() bookingSubmitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  userName: string = '';
  userEmail: string = '';
  submitMessage: string = '';
  messageType: 'success' | 'error' | 'info' | '' = '';
  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.userName = '';
    this.userEmail = '';
    this.submitMessage = '';
    this.messageType = '';
  }

  submitBooking(): void {
    if (!this.selectedSlot || !this.userName || !this.userEmail) {
      this.submitMessage = 'Please fill in all fields and select an event.';
      this.messageType = 'error';
      return;
    }

    if (!this.isValidEmail(this.userEmail)) {
      this.submitMessage = 'Please enter a valid email address.';
      this.messageType = 'error';
      return;
    }

    this.isSubmitting = true;
    const booking = {
      user_name: this.userName,
      user_email: this.userEmail,
      event_slot_id: this.selectedSlot.id
    };

    this.bookingSubmitted.emit(booking);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  cancelBooking(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  displayMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.submitMessage = message;
    this.messageType = type;
    this.isSubmitting = false;
  }
}
