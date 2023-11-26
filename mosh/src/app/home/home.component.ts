import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Home comp</h1>
    <app-reservation-list></app-reservation-list>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
