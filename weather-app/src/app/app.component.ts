import { Component, OnInit } from '@angular/core';
import { LocalStorageThemeService } from './services/local-storage/local-storage-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit {
  isDarkMode!: boolean;

  title: string = 'SoulTeam Weather';
  currentLocationCoords: any = null // get from navigator.geolocation.getCurrentPosition;
  defaultCity: string = 'Lviv';

  constructor(public localStorageThemeService: LocalStorageThemeService) { }
  
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
}