import { Component } from '@angular/core';

@Component({
  selector: 'customer-list',
  template:`
        
  
  `,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  title = 'Customer list component works'
  customers = ['customer1','customer2','customer3']

}
