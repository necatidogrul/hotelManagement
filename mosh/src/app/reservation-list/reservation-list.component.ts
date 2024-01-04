import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Stay } from '../stay.model';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent {
  stays: Array<Stay> = [];
  notes: { [key: number]: { stay: Stay; text: string } } = {};
  showNotesSection: boolean = false;

  constructor(private customerService: CustomerService) {
    this.loadStays();
  }

  loadStays() {
    this.customerService.getAllStays().then((response) => {
      this.stays = response;
    });
  }

  addNote(stay: Stay) {
    const noteText = prompt('Enter a note for the stay:');
    if (noteText !== null) {
      if (!this.notes[stay.customerId]) {
        this.notes[stay.customerId] = { stay, text: noteText };
      } else {
        this.notes[stay.customerId].text += '\n' + noteText;
      }
      this.showNotesSection = true;
    }
  }

  getNotesList(): Array<{ stay: Stay; text: string }> {
    return Object.values(this.notes) as Array<{
      stay: Stay;
      text: string;
    }>;
  }

  getNoteText(stay: Stay): string {
    return this.notes[stay.customerId] ? this.notes[stay.customerId].text : '';
  }

  addNoteToStay(stay: Stay) {
    const noteText = prompt('Enter a note for the stay:');
    if (noteText !== null) {
      if (!this.notes[stay.customerId]) {
        this.notes[stay.customerId] = { stay, text: noteText };
      } else {
        this.notes[stay.customerId].text += '\n' + noteText;
      }
      this.showNotesSection = true;
    }
  }

  trackByFunction(index: number, item: Stay): number {
    return item.customerId;
  }
}
