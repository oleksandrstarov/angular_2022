import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { byCountry } from 'country-code-lookup';
import { Observable } from 'rxjs';
import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { ForecastService } from '../services/forecast/forecast.service';
import { WeekDays } from '../shared/enums/weekdays.enum';
import { Month } from '../shared/enums/months.enum';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.scss']
})
  
export class WeekForecastComponent implements OnInit {
  public searchQuery: string = '';
  public forecastData: Observable<Object> = new Observable();
  public currentCity: string = '';
  public currentCountry: string = '';
  public forecast!: any;

  private hoursToShowInTemplate = [10, 14, 18];

  starImagePath: string = '';

  constructor(
    private _router: Router,
    private favoriteCityListService: FavoriteCityListService,
    private forecastService: ForecastService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.searchQuery = params['city']);
  }

  ngOnInit(): void {
    this.getForecast();

    this.starImagePath = this.getStarImagePath();

    this.favoriteCityListService.favoriteCities.subscribe(() => {
      this.starImagePath = this.getStarImagePath();
    });
  }

  getForecast() {
    this.forecastData = this.forecastService.getDayForecast(this.searchQuery, 3);
    this.forecastData.subscribe((data: any) => {
      this.currentCity = data.location.name;
      this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';
      if (data.location.country === 'United States of America') {
        this.currentCountry = 'US';
      };
      this.forecast = data.forecast.forecastday.map((day: any) => {
        day.hour = day.hour.filter((item: any, index: number) => {
          if (this.hoursToShowInTemplate.includes(index)) {
           return item;
          }
        })
        return day = day.hour;
      })
      this.starImagePath = this.getStarImagePath();
    })
  }
  
  getDayAndTime(obj: any): string {
    const date = new Date(obj[0].time);
      return `${WeekDays[date.getDay()]}, ${Month[date.getMonth()]} ${obj[0].time.split('-')[2].split(' ')[0]}`;
  }

  getConditionIconUrlMobile(obj: any): string {
     const currentHour = parseInt(obj[1].time.split(' ')[1].split(':')[0]);
    const isDay: boolean = currentHour >= 4 && currentHour <= 20;
    return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${obj[1].condition.code}.svg`;
  }

  public getConditionIconUrl(obj: any): string {
     const currentHour = parseInt(obj.time.split(' ')[1]);
    const isDay: boolean = currentHour >= 4 && currentHour <= 20;
    return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${obj.condition.code}.svg`;
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
