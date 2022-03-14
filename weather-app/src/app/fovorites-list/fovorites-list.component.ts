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
    if(this.fovoritList.length)
    this.favoritListState = !this.favoritListState;
  }

  removeFavotiteItem(i:number) {
    this.fovoritList.splice(i,1);
  }
}
