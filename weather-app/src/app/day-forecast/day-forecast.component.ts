import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { DayForecastService } from '../services/day-forecast/day-forecast.service';
import { Observable } from 'rxjs';
import { byCountry } from 'country-code-lookup';


@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent implements OnInit {
  public searchQuery: string;
  public forecastData: Observable<Object> = new Observable();
  public forecast!: any;
  public currentCity: string = 'Lviv';
  public currentCountry: string = 'UA';
  public currentDay: string = 'Monday';
  public currentTime: string = '06:00';

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
    private dayForecastService: DayForecastService,
    private route: ActivatedRoute
  ) {
    this.searchQuery = this.route.snapshot.params['city'];
  }

  ngOnInit(): void {
    this.forecastData = this.dayForecastService.getDayForecast(this.searchQuery);
    this.forecastData.subscribe((data: any) => {
      console.log(data)
      this.currentCity = data.location.name;
      this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';
      this.currentTime = data.location.localtime.split(' ')[1];
      this.forecast = data.forecast.forecastday[0].hour.filter((item: any, index: number) => {
        if (index === 0 || index === 3 || index === 6 || index === 9 || index === 12 || index === 15 || index === 18 || index === 21
        ) {
          return item;
        }
      });
    })

    this.starImagePath = this.getStarImagePath();

    this.favoriteCityListService.favoriteCities.subscribe(() => {
      this.starImagePath = this.getStarImagePath();
    });
  }

  // public getConditionIconUrl(time: string, conditionCode: number): string {
  //   const currentHour = parseInt(time);
  //   const isDay: boolean = currentHour >= 4 && currentHour <= 20;
  //   return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${conditionCode}.svg`;
  // }

  public getConditionIconUrl(conditionCode: string): string {
    return `../../assets/images/weather-icons/day/${conditionCode}.svg`;
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
