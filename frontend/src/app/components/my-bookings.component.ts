import { Component, OnInit } from '@angular/core';
import { EventService, Booking } from '../services/event.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  userEmail: string = '';
  loading: boolean = false;
  showSearch: boolean = false;
  searchEmail: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    if (!this.userEmail && !this.searchEmail) {
      return;
    }

    this.loading = true;
    const email = this.searchEmail || this.userEmail;

    this.eventService.getBookings(email).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
      }
    });
  }

  searchBookings(): void {
    if (!this.searchEmail) {
      return;
    }
    this.loadMyBookings();
  }

  cancelBooking(bookingId: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    this.eventService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.id !== bookingId);
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
      }
    });
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    this.searchEmail = '';
  }

  getStatusColor(status: string): string {
    return status === 'confirmed' ? 'confirmed' : 'cancelled';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
