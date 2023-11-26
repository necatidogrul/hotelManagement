import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[] | undefined;
  customerService: CustomerService | undefined;
  constructor(customerService: CustomerService){
    this.customerService = customerService;
    this.posts = [];
    this.customerService.getAllPosts().then((response)=>{
      this.posts = response;
    })

  }
}
