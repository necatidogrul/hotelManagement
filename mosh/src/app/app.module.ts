import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DenemeComponent } from './deneme/deneme.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { AddGuestsComponent } from './add-guests/add-guests.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DatePipe } from '@angular/common';
import { TodaysCheckoutComponent } from './todays-checkout/todays-checkout.component';
import { FindReservationComponent } from './find-reservation/find-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservationListComponent,
    FavoriteComponent,
    CreateCustomerComponent,
    AddGuestsComponent,
    DenemeComponent,
    SearchCustomerComponent,
    CreateCustomerComponent,
    ReservationComponent,
    TodaysCheckoutComponent,
    FindReservationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CustomerService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
