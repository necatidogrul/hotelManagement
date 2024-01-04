import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer.service';
import { Stay } from '../stay.model';
import { AppError } from '../common/app-error';
import { ServerError } from '../common/server-error';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  roomTypes$ = this.customerService.getRoomTypes();
  rooms$ = of<string[]>([]);
  customerId: number | undefined;
  customerReservations: Stay[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      customerId: [0, Validators.required],
      roomType: ['', Validators.required],
      room: ['', Validators.required],
      dateArrival: [this.getFormattedDate(new Date()), Validators.required],
      dateDeparture: [this.getFormattedDate(new Date()), Validators.required],
      notes: [''],
      source: ['', Validators.required],
      paymentAmount: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.customerId = +params['customerId'];
      this.form.patchValue({ customerId: this.customerId });
      this.loadCustomerReservations();
    });

    this.loadRoomsByType();
  }

  async loadCustomerReservations(): Promise<void> {
    if (this.customerId) {
      try {
        this.customerReservations = await this.customerService
          .getCustomerReservations(this.customerId.toString())
          .toPromise();
      } catch (error) {
        if (error instanceof ServerError) {
          console.error(
            'Server error occurred while loading reservations:',
            error
          );
        } else if (error instanceof AppError) {
          console.error('Error loading reservations:', error);
        }
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.successMessage = null;
      this.errorMessage = null;

      const customerId = this.form.value.customerId;
      const roomType = this.form.value.roomType;
      const room = this.form.value.room;
      const dateArrival = this.form.value.dateArrival;
      const dateDeparture = this.form.value.dateDeparture;

      const existingReservations = await this.customerService
        .getCustomerReservations(customerId.toString())
        .toPromise();

      if (existingReservations) {
        const isDuplicate = existingReservations.some(
          (reservation) =>
            reservation.roomType === roomType &&
            reservation.room === room &&
            this.doDatesOverlap(
              reservation.dateArrival,
              reservation.dateDeparture,
              dateArrival,
              dateDeparture
            )
        );

        if (isDuplicate) {
          this.errorMessage = 'Error: Duplicate reservation found.';
          return;
        }
      }

      const createdReservationData = new Stay(
        customerId,
        roomType,
        room,
        dateArrival,
        dateDeparture,
        this.form.value.notes,
        this.form.value.source,
        this.form.value.paymentAmount,
        new Date().toISOString()
      );

      try {
        const createdReservation = await this.customerService
          .createReservation(createdReservationData)
          .toPromise();
        this.successMessage = 'Reservation created successfully!';
        await this.loadCustomerReservations();
      } catch (error) {
        if (error instanceof AppError) {
          this.errorMessage = 'Error creating reservation.';
          console.error('Error creating reservation:', error);
        }
      }
    }
  }

  private doDatesOverlap(
    dateArrival1: string,
    dateDeparture1: string,
    dateArrival2: string,
    dateDeparture2: string
  ): boolean {
    const arrival1 = new Date(dateArrival1);
    const departure1 = new Date(dateDeparture1);
    const arrival2 = new Date(dateArrival2);
    const departure2 = new Date(dateDeparture2);

    return (
      (arrival1 <= arrival2 && arrival2 < departure1) ||
      (arrival1 < departure2 && departure2 <= departure1) ||
      (arrival2 <= arrival1 && arrival1 < departure2) ||
      (arrival2 < departure1 && departure1 <= departure2)
    );
  }

  async loadRoomsByType(): Promise<void> {
    const selectedRoomType = this.form.value.roomType;
    if (selectedRoomType) {
      try {
        const rooms = await this.customerService
          .getRoomsByType(selectedRoomType)
          .toPromise();

        if (rooms) {
          const roomNames = rooms.map((room) => room.name);
          this.rooms$ = of(roomNames);
        } else {
          this.errorMessage = 'No rooms available for the selected type.';
          console.error('No rooms available for the selected type.');
        }
      } catch (error) {
        if (error instanceof ServerError) {
          this.errorMessage = 'Server error occurred while loading rooms.';
          console.error('Server error loading rooms:', error);
        } else if (error instanceof AppError) {
          this.errorMessage = 'Error loading rooms.';
          console.error('Error loading rooms:', error);
        }
      }
    }
  }

  private getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
