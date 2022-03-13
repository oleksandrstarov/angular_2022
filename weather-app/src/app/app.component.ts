import { Component, OnInit } from '@angular/core';
import { LocalStorageThemeService } from './services/local-storage/local-storage-theme.service';
import { Observable } from 'rxjs';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit {
  isDarkMode!: boolean;

  public backgroundClassName: string = '';
  public title: string = 'SoulTeam Weather';
  public currentWeatherData: Observable<Object> = new Observable();

  constructor(public localStorageThemeService: LocalStorageThemeService, private weatherService: WeatherService) { }
  
  ngOnInit(): void {
    const currentTheme: string | null = this.localStorageThemeService.getCurrentTheme();
    if (!currentTheme) {
      this.isDarkMode = false;
      this.localStorageThemeService.setTheme('light');
    }
    if (currentTheme === 'light') {
      this.isDarkMode = false;
    }
    if (currentTheme === 'dark') {
      this.isDarkMode = true;
    }

    const currentLocationCoords: any = null // get from navigator.geolocation.getCurrentPosition;
    const defaultCity: string = 'Lviv';
    const locationQuery: string = currentLocationCoords ?? defaultCity;

    this.currentWeatherData = this.weatherService.getCurrentWeather(locationQuery);

    this.currentWeatherData.subscribe((data: any) => {
      this.backgroundClassName = this.getBackgroundClassName(data.location.localtime);
    });
  }

  toggleTheme(): void {
    if (this.isDarkMode === false) {
      this.isDarkMode = true;
      this.localStorageThemeService.setTheme('dark');
      return;
    }

    if (this.isDarkMode === true) {
      this.isDarkMode = false;
      this.localStorageThemeService.setTheme('light');
      return;
    }
  }

  getBackgroundClassName(localDateTime: string) {
    const hour: number = parseInt(localDateTime.split(' ')[1]);
    switch (true) {
      case (hour >= 0 && hour < 6):
        return 'night';
      case (hour >= 6 && hour < 12):
        return 'morning';
      case (hour >= 18 && hour < 24):
        return 'evening';
      default:
        return 'day';
    }
  }
}
