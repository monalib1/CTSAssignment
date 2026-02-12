import { Component, OnInit } from '@angular/core';
import { EventService, EventSlot } from '../services/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  daysInMonth: (Date | null)[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  eventSlots: EventSlot[] = [];
  filteredSlots: EventSlot[] = [];
  selectedSlot: EventSlot | null = null;
  loading: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEventSlots();
    this.generateCalendar();
  }

  loadEventSlots(): void {
    this.loading = true;
    this.eventService.getEventSlots().subscribe({
      next: (slots) => {
        this.eventSlots = slots;
        this.filterSlotsByDate();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading event slots:', error);
        this.loading = false;
      }
    });
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.daysInMonth = [];
    const date = new Date(startDate);

    while (date <= lastDay || date.getDay() !== 0) {
      if (date.getMonth() === month) {
        this.daysInMonth.push(new Date(date));
      } else {
        this.daysInMonth.push(null);
      }
      date.setDate(date.getDate() + 1);
    }
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(this.currentDate);
    this.generateCalendar();
    this.filterSlotsByDate();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(this.currentDate);
    this.generateCalendar();
    this.filterSlotsByDate();
  }

  selectDate(date: Date | null): void {
    this.selectedDate = date;
    this.filterSlotsByDate();
    this.selectedSlot = null;
  }

  filterSlotsByDate(): void {
    if (!this.selectedDate) {
      this.filteredSlots = this.eventSlots;
    } else {
      const selectedDateStr = this.selectedDate.toDateString();
      this.filteredSlots = this.eventSlots.filter(slot => {
        const slotDate = new Date(slot.start_time).toDateString();
        return slotDate === selectedDateStr;
      });
    }
  }

  selectSlot(slot: EventSlot): void {
    this.selectedSlot = slot;
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isCurrentMonth(date: Date | null): boolean {
    if (!date) return false;
    return date.getMonth() === this.currentDate.getMonth();
  }

  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }
}
