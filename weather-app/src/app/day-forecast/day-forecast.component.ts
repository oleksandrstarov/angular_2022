import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { ForecastService } from '../services/forecast/forecast.service';
import { Observable } from 'rxjs';
import { byCountry } from 'country-code-lookup';
import { WeekDays } from '../shared/enums/weekdays.enum';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
  
export class DayForecastComponent implements OnInit, DoCheck {
  public searchQuery: string = '';
  public oldSearchQuery: string = '';
  public changeDetected: boolean = false;
  public forecastData: Observable<Object> = new Observable();
  public forecast!: any;
  public currentCity: string = 'Lviv';
  public currentCountry: string = 'UA';
  public currentDay: any = 'Monday';
  public currentTime: string = '06:00';

  private hoursToShowInTemplate = [0, 3, 6, 9, 12, 15, 18, 21]

  starImagePath: string = '';

  constructor(
    private favoriteCityListService: FavoriteCityListService,
    private _router: Router,
    private forecastService: ForecastService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.searchQuery = params['city']);
  }

  ngOnInit(): void {
    this.getForecast();

    this.favoriteCityListService.favoriteCities.subscribe(() => {
      this.starImagePath = this.getStarImagePath();
    });
  }

  ngDoCheck(): void {
    if (this.searchQuery !== this.oldSearchQuery) {
      this.changeDetected = true;
      this.getForecast();
      this.oldSearchQuery = this.searchQuery;
    }

    this.changeDetected = false;
  }

  goToForecast() {
    this._router.navigate(['forecast', this.currentCity])
  }
  
  getForecast() {
    this.forecastData = this.forecastService.getDayForecast(this.searchQuery, 1);
    this.forecastData.subscribe((data: any) => {
      this.currentCity = data.location.name;
      this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';
      if (data.location.country === 'United States of America') {
        this.currentCountry = 'US';
      };
      const date = new Date(data.location.localtime);
      this.currentDay = WeekDays[date.getDay()];
      this.currentTime = data.location.localtime.split(' ')[1];
      this.forecast = data.forecast.forecastday[0].hour.filter((item: any, index: number) => {
        if (this.hoursToShowInTemplate.includes(index)) {
          return item;
        }
      });

      this.starImagePath = this.getStarImagePath();
    })
  }
  
  public getConditionIconUrl(obj: any): string {
    const currentHour = parseInt(obj.time.split(' ')[1]);
    const isDay: boolean = currentHour >= 4 && currentHour <= 20;
    return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${obj.condition.code}.svg`;
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
