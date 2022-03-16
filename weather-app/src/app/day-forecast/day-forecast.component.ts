import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { DayForecastService } from '../services/day-forecast/day-forecast.service';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent implements OnInit {
    public defaultCity: string = 'Lviv';

  currentCity = 'Ivano-Frankivsk';
  currentCountry = 'UA';
  currentDay = 'Monday';
  currentTime = '06:00';
  currentDegrees = '+12';
  curentWeatherIconUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/029d142b34871bcbc90d7cd46081c50310c831c5/production/fill/svg/overcast-day-fog.svg';

  weathers = [
    {id: 1, time: '0:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 2, time: '3:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 3, time: '6:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 4, time: '9:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 5, time: '12:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 6, time: '15:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 7, time: '18:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
    {id: 8, time: '21:00', img: this.curentWeatherIconUrl, temp: 8, feels: 10, press: 990, humidity: 40, wind: 55},
  ];

  times = this.weathers.map(weather => weather.time);
  starImagePath: string = '';

  goToForecast() {
    this._router.navigate(['forecast', this.currentCity])
  }

  constructor(
    private favoriteCityListService: FavoriteCityListService,
    private _router: Router,
    private http: HttpClient,
    private dayForecastService: DayForecastService
  ) { }

  ngOnInit(): void {
    this.dayForecastService.getDayForecast(this.defaultCity);

    this.starImagePath = this.getStarImagePath();

    this.favoriteCityListService.favoriteCities.subscribe(() => {
      this.starImagePath = this.getStarImagePath();
    });
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
