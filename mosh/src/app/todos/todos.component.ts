import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: any[] | undefined;
  customerService: CustomerService | undefined;
  constructor(customerService: CustomerService){
    this.customerService= customerService;
    this.todos = [];
    this.customerService.getAllTodos().then((response)=>{
      this.todos = response;
    })
  }
}
