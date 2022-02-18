import { Component } from '@angular/core';

@Component({
  selector: 'app-fovorites-list',
  templateUrl: './fovorites-list.component.html',
  styleUrls: ['./fovorites-list.component.scss']
})
export class FovoritesListComponent {

  fovoritList: string[] = ['Kyiv', 'Lviv', 'Ivano-Frankivsk', 'Mykolaiv'];
  favoritListState: boolean = false;
  
  constructor() { }

  showFavoritList() {
    this.favoritListState = !this.favoritListState;
  }
}
