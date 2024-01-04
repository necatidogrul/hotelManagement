import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ServerError } from '../common/server-error';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-todays-checkout',
  templateUrl: './todays-checkout.component.html',
  styleUrls: ['./todays-checkout.component.css'],
})
export class TodaysCheckoutComponent implements OnInit {
  todaysCheckoutStays: any[] | undefined;
  errorMessage: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadTodaysCheckoutStays();
  }

  loadTodaysCheckoutStays(): void {
    this.customerService.getTodaysCheckoutStays().subscribe(
      (stays) => {
        this.todaysCheckoutStays = stays;
      },
      (error) => {
        if (error instanceof ServerError) {
          this.errorMessage = 'Server hatası';
        } else if (error instanceof AppError) {
          this.errorMessage = 'Beklenmeyen bir hata oluştu';
        } else {
          this.errorMessage = 'Beklenmeyen bir hata oluştu';
        }
        console.error("Error loading today's checkout stays:", error);
      }
    );
  }
}
