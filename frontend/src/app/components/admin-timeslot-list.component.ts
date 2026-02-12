import { Component, OnInit } from '@angular/core';
import { EventService, EventSlot } from '../services/event.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-timeslot-list',
  templateUrl: './admin-timeslot-list.component.html',
  styleUrls: ['./admin-timeslot-list.component.css']
})
export class AdminTimeslotListComponent implements OnInit {
  eventSlots: any[] = [];
  loading = false;

  constructor(private eventService: EventService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.eventService.getEventSlots().subscribe({
      next: slots => {
        // For each slot, fetch its booking (if any)
        const slotRequests = slots.map(slot =>
          this.http.get<any[]>(`http://localhost:5000/api/bookings?event_slot_id=${slot.id}`).toPromise()
            .then(bookings => {
              slot.booking = bookings && bookings.length > 0 ? bookings[0] : null;
              return slot;
            })
        );
        Promise.all(slotRequests).then(results => {
          this.eventSlots = results;
          this.loading = false;
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
