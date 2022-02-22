import { Component, OnInit } from '@angular/core';
import { LocalStorageThemeService } from '../services/local-storage/local-storage-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit {
  isDarkMode!: boolean;

  constructor(public localStorageThemeService: LocalStorageThemeService) {}
  
  ngOnInit(): void {
    console.log(this.isDarkMode);
    const currentTheme: string | null = this.localStorageThemeService.getCurrentTheme();
    console.log('app-init -> 0');
    if (!currentTheme) {
      console.log('app-init -> 1');
      this.isDarkMode = false;
      console.log('app-init -> 2');
      this.localStorageThemeService.setTheme('light');
      console.log('app-init -> 3');
    }  
    if (currentTheme === 'light') {
      console.log('app-init -> 4');
      this.isDarkMode = false;
      console.log('app-init -> 5');
    }
    if (currentTheme === 'dark') {
      console.log('app-init -> 6');
      this.isDarkMode = true;
      console.log('app-init -> 7');
    }
    console.log(this.isDarkMode);
  }

  toggleTheme(): void {
    console.log('toggle theme -> 1');
    if (this.isDarkMode === false) {
      console.log('toggle theme -> 2')
      this.isDarkMode = true;
      console.log('toggle theme -> 3')
      console.log(this.isDarkMode)
      this.localStorageThemeService.setTheme('dark');
      console.log('toggle theme -> 4')
      return;
    }

    if (this.isDarkMode === true) {
      console.log('toggle theme -> 5')
      this.isDarkMode = false;
      console.log(this.isDarkMode)
      console.log('toggle theme -> 6')
      this.localStorageThemeService.setTheme('light');
      console.log('toggle theme -> 7')
      return;
    }
  }
}
