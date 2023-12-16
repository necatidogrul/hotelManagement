import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <div>
    <span  >{{count}}</span>
    <br>
    <button class="btn btn primary" [style.backgroundColor]="'green'" (click)="increment()">+</button>
    <button class="btn btn primary" [style.backgroundColor]="'red'" (click)="decrement()">-</button>
  </div>
    
  
            `,
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  count=0;
  @Output() countChange = new EventEmitter();
  increment(){
    this.count = this.count+1;
    this.countChange.emit(this.count)
  }
  decrement(){
    this.count = this.count -1;
    this.countChange.emit(this.count)
  }
  onCountChange(count: number){
    this.count=count
  }



 }
