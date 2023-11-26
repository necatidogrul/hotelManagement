import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';
import { CustomerService } from './customer.service';
import { TodosComponent } from './todos/todos.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    CustomerListComponent,
    CustomerComponent,
    CustomersComponent,
    TodosComponent,
    ReservationListComponent,
    HomeComponent,
    PanelComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CustomerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
