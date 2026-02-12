// ...existing code...
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventSlot {
  id: number;
  title: string;
  category?: string;
  description: string;
  start_time: string;
  end_time: string;
  capacity?: number;
  location: string;
  available_slots?: number;
  booking?: any; // for admin-timeslot-list
}

export interface Booking {
  id: number;
  user_name: string;
  user_email: string;
  event_slot_id: number;
  event_title?: string;
  event_start_time?: string;
  booking_date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Event Slots
  getEventSlots(): Observable<EventSlot[]> {
    return this.http.get<EventSlot[]>(`${this.apiUrl}/slots`);
  }

  getEventSlot(id: number): Observable<EventSlot> {
    return this.http.get<EventSlot>(`${this.apiUrl}/slots/${id}`);
  }

  createEventSlot(slot: Partial<EventSlot>): Observable<EventSlot> {
    return this.http.post<EventSlot>(`${this.apiUrl}/slots`, slot);
  }

  updateEventSlot(id: number, slot: Partial<EventSlot>): Observable<EventSlot> {
    return this.http.put<EventSlot>(`${this.apiUrl}/slots/${id}`, slot);
  }

  deleteEventSlot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/slots/${id}`);
  }

  // Bookings
  getBookings(userEmail?: string): Observable<Booking[]> {
    let url = `${this.apiUrl}/bookings`;
    if (userEmail) {
      url += `?user_email=${userEmail}`;
    }
    return this.http.get<Booking[]>(url);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
  }

  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/bookings/${id}`, booking);
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}
