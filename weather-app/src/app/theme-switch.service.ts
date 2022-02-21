import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  
export class ThemeSwitchService {
   theme = {
    LIGHT: 'light',
    DARK: 'dark',
   };
  
  isDarkMode!: boolean;

  getCurrentTheme(): string | null {
    return localStorage.getItem('theme');
  }

  initTheme() {
     const currentTheme: string | null = this.getCurrentTheme();

    if (!currentTheme) {
      this.isDarkMode = false;
      this.setTheme('light');
    }
    if (currentTheme === 'light') {
      this.isDarkMode = false;
    }
    if (currentTheme === 'dark') {
      this.isDarkMode = true;
    }
  }

  setTheme(theme: string): void {
    console.log('9')
    if (theme === this.theme.DARK) {
      console.log('10')
      window.localStorage.setItem('theme', this.theme.DARK);
    }
    if (theme === this.theme.LIGHT) {
      console.log('11')
      window.localStorage.setItem('theme', this.theme.LIGHT);
    }
  }

  toggleTheme() {
    console.log('1');
    if (this.isDarkMode === false) {
      console.log('2')
      this.isDarkMode = true;
      console.log('3')
      console.log(this.isDarkMode)
      this.setTheme('dark');
      console.log('4')
      return;
    }

    if (this.isDarkMode === true) {
      console.log('5')
      this.isDarkMode = false;
      console.log(this.isDarkMode)
      console.log('6')
      this.setTheme('light');
      console.log('7')
      return;
    }
  }
}
