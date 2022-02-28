import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent {
  isDarkMode = false;
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

  constructor(private _router: Router) { }

  goToForecast() {
    this._router.navigate(['forecast', this.currentCity])
  }
}
