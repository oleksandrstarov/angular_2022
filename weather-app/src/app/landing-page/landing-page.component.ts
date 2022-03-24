import { Component, Input, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { byCountry } from 'country-code-lookup';
import { Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../styles/_container.scss']
})
export class LandingPageComponent implements OnInit {
  public defaultCity: string = 'Lviv';
  public currentCity: string = 'Lviv';
  public currentCountry: string = 'UA';
  public currentDay: string = '';
  public currentTime: string = ''; 
  public currentDegrees: any = ''; 
  public curentWeatherIconUrl = '';
  public currentWeatherData: Observable<Object> = new Observable();
 
  isDarkMode = true;
  weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {    
    this.getCurrentCoordinates().then((coordinates: string) => {
      this.currentWeatherData = this.weatherService.getCurrentWeather(coordinates);
    }).catch(() => {
      this.currentWeatherData = this.weatherService.getCurrentWeather(this.defaultCity);
    }).finally(() => {
      this.currentWeatherData.subscribe((data: any) => {
        const currentDate = data.location.localtime.split(' ')[0];
        const currentDayIndex = new Date(currentDate).getDay();
        this.currentCity = data.location.name;
        this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';
        if (data.location.country === 'United States of America') {
          this.currentCountry = 'US';
        }
        this.currentDay = this.weekday[currentDayIndex];
        this.currentTime = data.location.localtime.split(' ')[1];
        this.currentDegrees = data.current.temp_c > 0 ? `+${Math.round(data.current.temp_c)}` : Math.round(data.current.temp_c);
        this.curentWeatherIconUrl = this.getConditionIconUrl(this.currentTime, data.current.condition.code);
      });
    });
  }

  private getConditionIconUrl(time: string, conditionCode: number): string {
    const currentHour = parseInt(time);
    const isDay: boolean = currentHour >= 4 && currentHour <= 20;
    return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${conditionCode}.svg`;
  }

  private getCurrentCoordinates(): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve(`${resp.coords.latitude}, ${resp.coords.longitude}`);
        },
        err => {
          reject(err);
        });
    });
  }
}