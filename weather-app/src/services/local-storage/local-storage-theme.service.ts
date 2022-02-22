import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  
export class LocalStorageThemeService {
   theme = {
    LIGHT: 'light',
    DARK: 'dark',
   };
  
  getCurrentTheme(): string | null {
    console.log('service -> 1');
    return localStorage.getItem('theme');
  }

  setTheme(theme: string): void {
    console.log('service -> 2');
    if (theme === this.theme.DARK) {
      console.log('service -> 3');
      window.localStorage.setItem('theme', this.theme.DARK);
    }
    if (theme === this.theme.LIGHT) {
      console.log('service -> 4');
      window.localStorage.setItem('theme', this.theme.LIGHT);
    }
  }
}
