import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Stay } from '../stay.model';

@Component({
  selector: 'app-find-reservation',
  templateUrl: './find-reservation.component.html',
  styleUrls: ['./find-reservation.component.css'],
})
export class FindReservationComponent {
  form: FormGroup;
  stays: Stay[] = [];
  errorMessage: string | null = null;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      customerId: [''],
    });

    this.errorMessage = null;
  }

  onSubmit() {
    const customerId = this.form.value.customerId;
    this.formSubmitted = true;

    if (customerId) {
      this.customerService.getCustomerReservations(customerId).subscribe(
        (reservations) => {
          this.stays = reservations;
          this.errorMessage = null;
        },
        (error) => {
          console.error('Error fetching reservations:', error);
          this.stays = [];
          this.errorMessage = 'Error fetching reservations. Please try again.';
        }
      );
    }
  }
}
