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
import { NewComponentComponent } from './new-component/new-component.component';
import { DenemeComponent } from './deneme/deneme.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservationListComponent,
    FavoriteComponent,
    CreateCustomerComponent,
    NewComponentComponent,
    DenemeComponent,
    SearchCustomerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
