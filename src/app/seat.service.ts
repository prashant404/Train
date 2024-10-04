import { Injectable } from '@angular/core';

export interface Seat {
  row: number;
  seatNumber: number;
  isBooked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seats: Seat[] = [];

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    // Initialize 80 seats: 11 rows with 7 seats and 1 row with 3 seats
    for (let i = 1; i <= 11; i++) {
      for (let j = 1; j <= 7; j++) {
        this.seats.push({ row: i, seatNumber: j, isBooked: false });
      }
    }
    // Last row with only 3 seats
    for (let j = 1; j <= 3; j++) {
      this.seats.push({ row: 12, seatNumber: j, isBooked: false });
    }

    // Pre-book some seats for demonstration
    this.bookSeat(1, 1);
    this.bookSeat(1, 2);
    this.bookSeat(2, 1);
    this.bookSeat(2, 2);
    this.bookSeat(2, 3);
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  bookSeat(row: number, seatNumber: number): void {
    const seat = this.seats.find(s => s.row === row && s.seatNumber === seatNumber);
    if (seat) {
      seat.isBooked = true;
    }
  }

  getAvailableSeats(requestedSeats: number): Seat[] {
    const availableSeats: Seat[] = [];

    // Check each seat to find available ones
    for (const seat of this.seats) {
      if (!seat.isBooked) {
        availableSeats.push(seat);
      }
      if (availableSeats.length === requestedSeats) {
        break; // Stop once we have enough available seats
      }
    }

    // If enough seats are found, return them, otherwise return empty
    return availableSeats.length >= requestedSeats ? availableSeats : [];
  }
}
