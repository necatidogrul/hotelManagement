import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FindReservationComponent } from './find-reservation/find-reservation.component';

const routes: Routes = [
  { path: '', redirectTo: '/last-reservations', pathMatch: 'full' },
  { path: 'last-reservations', component: ReservationListComponent },
  { path: 'new-customer', component: CreateCustomerComponent },
  { path: 'search-customer', component: SearchCustomerComponent },
  { path: 'new-reservation', component: ReservationComponent },
  { path: 'new-reservation/:customerId', component: ReservationComponent },
  { path: 'find-reservation', component: FindReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
