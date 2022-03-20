import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { byCountry } from 'country-code-lookup';
import { Observable } from 'rxjs';
import { FavoriteCityListService } from '../services/favorite-city-list.service';
import { ForecastService } from '../services/forecast/forecast.service';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.scss']
})
export class WeekForecastComponent implements OnInit {
  public searchQuery: string = '';
  public forecastData: Observable<Object> = new Observable();
  public currentCity: string = 'Lviv';
  public currentCountry: string = 'UA';
  public forecast!: any;
  public forecastDay1!: any;
  public forecastDay2!: any;
  public forecastDay3!: any;

  private indexArr = [10, 14, 18];
  private weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];


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
    this.forecastData = this.forecastService.getDayForecast(this.searchQuery, 7);
    this.forecastData.subscribe((data: any) => {
      this.currentCity = data.location.name;
      this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';

      this.forecast = data.forecast.forecastday.map((day: any) => {
        day.hour = day.hour.filter((item: any, index: number) => {
          if (this.indexArr.includes(index)) {
           return item;
          }
        })
        return day = day.hour;
      })
      console.log(this.forecast)
    })
  }

   parseNumber(num: any) {
    return parseInt(num);
   }
  
  
  getDayAndTime(obj: any) {
    const date = new Date(obj[0].time);
      return `${this.weekday[date.getDay()]}, ${obj[0].time.split('-')[2].split(' ')[0]}.${this.month[date.getMonth()]}`;
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
