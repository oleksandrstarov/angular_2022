import { Component, OnInit } from '@angular/core';
import { byCountry } from 'country-code-lookup';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../styles/_container.scss']
})
export class LandingPageComponent implements OnInit {
  public currentCity: string = '';
  public currentCountry: string = '';
  public currentDay: string = '';
  public currentTime: string = ''; 
  public currentDegrees: string = ''; 
  public curentWeatherIconUrl = '';
 
  isDarkMode = false;
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Lviv').subscribe((data: any) => {
      const currentDate = data.location.localtime.split(" ")[0];
      const currentDayIndex = new Date(currentDate).getDay();
      this.currentCity = data.location.name;
      this.currentCountry = byCountry(data.location.country)?.iso2 ?? 'null';
      this.currentDay = this.weekday[currentDayIndex + 1];
      this.currentTime = data.location.localtime.split(" ")[1];
      this.currentDegrees = data.current.temp_c > 0 ? '+' + data.current.temp_c : data.current.temp_c;
      this.curentWeatherIconUrl = this.getConditionIconUrl(this.currentTime, data.current.condition.code);
    });
  }

  private getConditionIconUrl(time: string, conditionCode: number): string {
    const currentHour = parseInt(time);
    const isDay: boolean = currentHour >= 4 && currentHour <= 20;
    return `../../assets/images/weather-icons/${isDay ? 'day' : 'night'}/${conditionCode}.svg`
  }
}
