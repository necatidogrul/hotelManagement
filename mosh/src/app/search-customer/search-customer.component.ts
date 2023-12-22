import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css'],
})
export class SearchCustomerComponent {
  form: FormGroup;
  searchResults: any[] | undefined;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
    this.form = this.formBuilder.group({
      customerId: [''],
      firstName: [''],
      lastName: [''],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const customerId = this.form.value.customerId;
      const firstName = this.form.value.firstName;
      const lastName = this.form.value.lastName;

      this.errorMessage = null;

      try {
        this.searchResults = await this.customerService.searchCustomer(
          customerId,
          firstName,
          lastName
        );
      } catch (error) {
        if (error instanceof AppError) {
          this.errorMessage = 'Müşteri arama sırasında bir hata oluştu.';
          console.error('Müşteri arama hatası: ', error);
        }
      }
    }
  }
}
