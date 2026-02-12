import { Component, ViewChild } from '@angular/core';
import { BookingFormComponent } from './components/booking-form.component';
import { CalendarComponent } from './components/calendar.component';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  @ViewChild(CalendarComponent) calendar!: CalendarComponent;

  selectedSlot: any = null;
  showMyBookings: boolean = false;

  constructor(private eventService: EventService) {}

  onSlotSelected(slot: any): void {
    this.selectedSlot = slot;
  }

  onBookingSubmitted(booking: any): void {
    this.eventService.createBooking(booking).subscribe({
      next: (result) => {
        this.bookingForm.displayMessage(
          '✓ Booking successful! Confirmation has been sent to your email.',
          'success'
        );
        this.selectedSlot = null;
        // Refresh calendar to update available slots
        setTimeout(() => {
          this.calendar.loadEventSlots();
          this.bookingForm.resetForm();
        }, 1500);
      },
      error: (error) => {
        const errorMessage = error.error?.error || 'Failed to complete booking';
        this.bookingForm.displayMessage(errorMessage, 'error');
      }
    });
  }

  onBookingCancelled(): void {
    this.selectedSlot = null;
  }

  toggleMyBookings(): void {
    this.showMyBookings = !this.showMyBookings;
  }
}
