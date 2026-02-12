import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar.component';
import { BookingFormComponent } from './components/booking-form.component';
import { MyBookingsComponent } from './components/my-bookings.component';
import { AdminTimeslotComponent } from './components/admin-timeslot.component';
import { AdminTimeslotListComponent } from './components/admin-timeslot-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    BookingFormComponent,
    MyBookingsComponent,
    AdminTimeslotComponent,
    AdminTimeslotListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
