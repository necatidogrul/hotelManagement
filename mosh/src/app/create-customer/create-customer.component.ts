import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Duplicate } from '../common/duplicate';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
    this.form = this.formBuilder.group({
      tcNo: ['', [Validators.required, Validators.minLength(11)]],
      passportNo: ['string', Validators.required],
      nationality: ['string', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      gender: [0],
      streetAddress: ['string', Validators.required],
      city: ['string', Validators.required],
      country: ['string', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['string', Validators.required],
      notes: ['string', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const tcNo = this.form.value.tcNo;
      const email = this.form.value.email;

      this.successMessage = null;
      this.errorMessage = null;

      const existingCustomer = await this.customerService
        .getCustomerByTcNoEmail(tcNo, email)
        .catch((error) => {
          if (error instanceof AppError) {
            this.errorMessage = 'Müşteri kontrol edilemedi.';
            console.error('Müşteri kontrol edilemedi: ', error);
          }
        });

      if (existingCustomer) {
        this.errorMessage = "Bu TC No'ya sahip müşteri mevcut.";
      } else {
        const customerData = {
          id: 0,
          tcNo: tcNo,
          passportNo: this.form.value.passportNo,
          nationality: this.form.value.nationality,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          middleName: this.form.value.middleName,
          gender: this.form.value.gender,
          streetAddress: this.form.value.streetAddress,
          city: this.form.value.city,
          country: this.form.value.country,
          email: email,
          phone: this.form.value.phone,
          notes: this.form.value.notes,
        };

        const createdCustomer = await this.customerService
          .createCustomer(customerData)
          .toPromise()
          .catch((createError) => {
            if (createError instanceof Duplicate) {
              this.errorMessage = 'Bu müşteri zaten mevcut.';
            } else if (createError instanceof AppError) {
              this.errorMessage = 'Müşteri eklenemedi.';
              console.error('Müşteri oluşturulurken hata oluştu:', createError);
            }
          });

        if (createdCustomer) {
          this.successMessage = 'Customer eklendi!';
        }
      }
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
