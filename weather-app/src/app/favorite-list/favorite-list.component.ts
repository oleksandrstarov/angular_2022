import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  constructor(private favoriteCityListService: FavoriteCityListService, private router: Router) {
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
    this.favoriteListState = !!this.favoriteList.length;
  }

  routeToDayForecast(cityName: string): void {
    this.router.navigate(['details', cityName]);
    this.favoriteListState = false;
  }
}
