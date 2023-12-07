import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  @Input() item: any; 
  @Output() addNote = new EventEmitter <any>();

  isFavorite: boolean = false;

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.addNote.emit(this.item); 
  }
}
