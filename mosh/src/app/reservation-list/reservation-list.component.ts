import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent {
  reservations: Array<Reservation> = [];
  notes: { [key: number]: { reservation: Reservation; text: string } } = {};
  showNotesSection: boolean = false;
  constructor(private customerService: CustomerService) {
    this.loadReservations();
  }

  loadReservations() {
    this.customerService.getAllReservations().then((response) => {
      this.reservations = response;
    });
  }

  addNote(reservation: Reservation) {
    const noteText = prompt('Enter a note for the reservation:');
    if (noteText !== null) {
      if (!this.notes[reservation.id]) {
        this.notes[reservation.id] = { reservation, text: noteText };
      } else {
        this.notes[reservation.id].text += '\n' + noteText;
      }
      this.showNotesSection = true;

      const updatedReservation = this.reservations.find(
        (res) => res.id === reservation.id
      );
      if (updatedReservation) {
        updatedReservation.notes = this.notes[reservation.id].text;
      }
    }
  }

  getNotesList(): Array<{ reservation: Reservation; text: string }> {
    return Object.values(this.notes) as Array<{
      reservation: Reservation;
      text: string;
    }>;
  }

  getNoteText(reservation: Reservation): string {
    return this.notes[reservation.id] ? this.notes[reservation.id].text : '';
  }

  addNoteToReservation(reservation: Reservation) {
    const noteText = prompt('Enter a note for the reservation:');
    if (noteText !== null) {
      if (!this.notes[reservation.id]) {
        this.notes[reservation.id] = { reservation, text: noteText };
      } else {
        this.notes[reservation.id].text += '\n' + noteText;
      }
      this.showNotesSection = true;

      const updatedReservation = this.reservations.find(
        (res) => res.id === reservation.id
      );
      if (updatedReservation) {
        updatedReservation.notes = this.notes[reservation.id].text;
      }
    }
  }
}
