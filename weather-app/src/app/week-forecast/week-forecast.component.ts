import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteCityListService } from '../services/favorite-city-list.service';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.scss']
})
export class WeekForecastComponent {
  currentCity = 'Ivano-Frankivsk';
  currentCountry = 'UA';
  curentWeatherIconUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/029d142b34871bcbc90d7cd46081c50310c831c5/production/fill/svg/overcast-day-fog.svg';
  columnStatus = true;
  firstColumn = false;
  firstColumnChecked = true;
  secondColumn = true;
  secondColumnChecked = false;
  thirdColumn = true;
  thirdColumnChecked = false;
  fourthColumn = true;
  fourthColumnChecked = false;
  fifthColumn = true;
  fifthColumnChecked = false;
  sixthColumn = true;
  sixthColumnChecked = false;
  sevenColumn = true;
  sevenColumnChecked = false;
  starImagePath: string = '';
  constructor(private _router: Router, private favoriteCityListService: FavoriteCityListService) { }

  ngOnInit(): void {
    this.starImagePath = this.getStarImagePath();

    this.favoriteCityListService.favoriteCities.subscribe(() => {
      this.starImagePath = this.getStarImagePath();
    });
  }

  clearStatus() {
    this.firstColumnChecked = false;
    this.secondColumnChecked = false;
    this.thirdColumnChecked = false;
    this.fourthColumnChecked = false;
    this.fifthColumnChecked = false;
    this.sixthColumnChecked = false;
    this.sevenColumnChecked = false;
    this.firstColumn = true;
    this.secondColumn = true;
    this.thirdColumn = true;
    this.fourthColumn = true;
    this.fifthColumn = true;
    this.sixthColumn = true;
    this.sevenColumn = true;
  }

  changeStatus(column: number) {
    switch(column) {
      case 1: 
        this.clearStatus();
        this.firstColumn = false;
        this.firstColumnChecked = true;
      break;
      case 2:
        this.clearStatus();
        this.secondColumn = false;
        this.secondColumnChecked = true;
      break;
      case 3:
        this.clearStatus();
        this.thirdColumn = false;
        this.thirdColumnChecked = true;
      break;
      case 4:
        this.clearStatus();
        this.fourthColumn = false;
        this.fourthColumnChecked = true;
      break;
      case 5:
        this.clearStatus();
        this.fifthColumn = false;
        this.fifthColumnChecked = true;
      break;
      case 6:
        this.clearStatus();
        this.sixthColumn = false;
        this.sixthColumnChecked = true;
      break;
      case 7:
        this.clearStatus();
        this.sevenColumn = false;
        this.sevenColumnChecked = true;
      break;
    }
  }

  goToDetails() {
    this._router.navigate(['details', this.currentCity])
  }

  toggleFavorite(): void {
    if (this.favoriteCityListService.isFavorite(this.currentCity)) {
      this.favoriteCityListService.removeFavorite(this.currentCity);
    } else {
      this.favoriteCityListService.addFavorite(this.currentCity);
    }
  }

  private getStarImagePath(): string {
    const path = '../../assets/images/icons/';
    return this.favoriteCityListService.isFavorite(this.currentCity)
      ? `${path}star-light-checked.svg`
      : `${path}star-light-empty.svg`;
  }

}
