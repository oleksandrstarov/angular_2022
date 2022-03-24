import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalStorageThemeService } from './services/local-storage/local-storage-theme.service';
import { Observable } from 'rxjs';
import { WeatherService } from './services/weather.service';
import { LoaderService } from './services/loader.service';


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
  public isLoading: boolean = true;

  constructor(
    public localStorageThemeService: LocalStorageThemeService,
    private weatherService: WeatherService,
    private changeDetector: ChangeDetectorRef,
    private loaderService: LoaderService) { }
  
  ngOnInit(): void {
    const currentTheme: string | null = this.localStorageThemeService.getCurrentTheme();
    this.isDarkMode = currentTheme === 'dark';

    const currentLocationCoords: any = null // get from navigator.geolocation.getCurrentPosition;
    const defaultCity: string = 'Lviv';
    const locationQuery: string = currentLocationCoords ?? defaultCity;

    this.currentWeatherData = this.weatherService.getCurrentWeather(locationQuery);

    this.currentWeatherData.subscribe((data: any) => {
      this.backgroundClassName = this.getBackgroundClassName(data.location.localtime);
    });

    this.loaderService.isLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.localStorageThemeService.setTheme(this.isDarkMode === true ? 'dark' : 'light');
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
