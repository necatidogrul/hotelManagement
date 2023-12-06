import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.form = this.fb.group({
      tcNo: ['string', Validators.required],
      passportNo: ['string', Validators.required],
      nationality: ['string', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['string'],
      gender: [0],
      streetAddress: ['string', Validators.required],
      city: ['string', Validators.required],
      country: ['string', Validators.required],
      email: ['string', Validators.required],
      phone: ['string', Validators.required],
      notes: ['string', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const customerData = {
        id: 0,
        tcNo: this.form.value.tcNo,
        passportNo: this.form.value.passportNo,
        nationality: this.form.value.nationality,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        middleName: this.form.value.middleName,
        gender: this.form.value.gender,
        streetAddress: this.form.value.streetAddress,
        city: this.form.value.city,
        country: this.form.value.country,
        email: this.form.value.email,
        phone: this.form.value.phone,
        notes: this.form.value.notes,
      };

      this.customerService.createCustomer(customerData).subscribe({
        next: (response) => {
          this.successMessage = 'Customer başarıyla eklendi.';
          this.errorMessage = null;
          console.log('Müşteri başarıyla oluşturuldu:', response);
        },
        error: (error) => {
          this.successMessage = null;
          this.errorMessage = 'Customer eklenemedi.';
          console.error('Müşteri oluşturulurken hata oluştu:', error);
        },
      });
    }
  }
}
