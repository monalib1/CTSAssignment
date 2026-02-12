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
  daysInWeek: (Date | null)[] = [];
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
    this.generateWeek();
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

  generateWeek(): void {
    // Find the start of the week (Sunday)
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    this.daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.daysInWeek.push(day);
    }
  }

  previousWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.currentDate = new Date(this.currentDate);
    this.generateWeek();
    this.filterSlotsByDate();
  }

  nextWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.currentDate = new Date(this.currentDate);
    this.generateWeek();
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

  isCurrentWeek(date: Date | null): boolean {
    if (!date) return false;
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date >= startOfWeek && date <= endOfWeek;
  }

  getCurrentWeekRange(): string {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${startOfWeek.getDate()} ${this.monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${this.monthNames[endOfWeek.getMonth()]} ${endOfWeek.getFullYear()}`;
  }
}
