import { Component } from '@angular/core';
import { SeatService, Seat } from '../seat.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent {
  seats: Seat[] = [];
  requestedSeats: number = 0;
  bookedSeats: Seat[] = [];
  selectedSeats: Seat[] = []; // Array to hold selected seats

  constructor(private seatService: SeatService) {
    this.seats = this.seatService.getSeats();
  }

  // Function to handle seat selection
  onSeatClick(seat: Seat) {
    if (!seat.isBooked) {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat); // Deselect if already selected
      } else {
        if (this.selectedSeats.length < 7) { // Limit selection to 7 seats
          this.selectedSeats.push(seat);
        } else {
          alert('You can only select up to 7 seats.');
        }
      }
    }
  }

  // Reserve seats either by number of seats input or by selection
  onReserve() {
    if (this.requestedSeats > 0) {
      // Reserve by requested seats
      const availableSeats = this.seatService.getAvailableSeats(this.requestedSeats);
      if (availableSeats.length < this.requestedSeats) {
        alert('Not enough seats available!');
        return;
      }
      this.bookedSeats = availableSeats;
      availableSeats.forEach((seat: Seat) => this.seatService.bookSeat(seat.row, seat.seatNumber)); // Explicitly typing seat
      this.requestedSeats = 0; // Reset the input field
    } else if (this.selectedSeats.length > 0) {
      // Reserve by selected seats
      this.bookedSeats = [...this.selectedSeats];
      this.selectedSeats.forEach((seat: Seat) => this.seatService.bookSeat(seat.row, seat.seatNumber)); // Explicitly typing seat
      this.selectedSeats = []; // Reset selected seats after booking
    } else {
      alert('Please select at least one seat or enter the number of seats to book.');
    }
  }
}
