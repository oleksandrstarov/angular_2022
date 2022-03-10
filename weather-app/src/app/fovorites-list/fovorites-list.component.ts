import { FavoriteCityListService } from './../services/favorite-city-list.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fovorites-list',
  templateUrl: './fovorites-list.component.html',
  styleUrls: ['./fovorites-list.component.scss']
})
export class FovoritesListComponent {
  constructor(private favoriteCityListService: FavoriteCityListService) {
  }
  
  favoriteList: string[] = [];
  favoriteListState: boolean = false;

  ngOnInit(): void {
    this.favoriteCityListService.favoriteCities.subscribe(newFavoriteCities => {
      this.favoriteList = newFavoriteCities;
    });
  }

  showFavoritList() {
    if (this.favoriteList.length) {
      this.favoriteListState = !this.favoriteListState;
    }
  }

  removeFavotiteItem(i:number) {
    const city = this.favoriteList[i];
    this.favoriteCityListService.removeFavorite(city);
  }
}
