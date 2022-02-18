import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent implements OnInit {
  isDarkMode = true;
  currentCity = 'Ivano-Frankivsk';
  currentCountry = 'UA';
  currentDay = 'Monday';
  currentTime = '06:00';
  currentDegrees = '+12';
  curentWeatherIconUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/029d142b34871bcbc90d7cd46081c50310c831c5/production/fill/svg/overcast-day-fog.svg';
  constructor() { }

  ngOnInit(): void {
  }

}
