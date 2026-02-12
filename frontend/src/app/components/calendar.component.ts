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
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadEventSlots();
    this.generateCalendar();
  }

  loadCategories(): void {
    this.eventService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
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

    // ...existing code...
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
    let slots = this.eventSlots;
    if (this.selectedCategory) {
      slots = slots.filter(slot => slot.category === this.selectedCategory);
    }
    if (!this.selectedDate) {
      this.filteredSlots = slots;
    } else {
      const selectedDateStr = this.selectedDate.toDateString();
      this.filteredSlots = slots.filter(slot => {
        const slotDate = new Date(slot.start_time).toDateString();
        return slotDate === selectedDateStr;
      });
    }
  }

  onCategoryChange(): void {
    this.filterSlotsByDate();
    this.selectedSlot = null;
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
