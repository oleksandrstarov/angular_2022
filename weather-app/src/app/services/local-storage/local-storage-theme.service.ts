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
    return localStorage.getItem('theme');
  }

  setTheme(theme: string): void {
    if (theme === this.theme.DARK) {
      window.localStorage.setItem('theme', this.theme.DARK);
    }
    if (theme === this.theme.LIGHT) {
      window.localStorage.setItem('theme', this.theme.LIGHT);
    }
  }
}
