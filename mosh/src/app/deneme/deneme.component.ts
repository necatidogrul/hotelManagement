import { Component } from '@angular/core';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrl: './deneme.component.css'
})
export class DenemeComponent {

  getValue(event:any){
    console.log(event.target.value)
  }

}
