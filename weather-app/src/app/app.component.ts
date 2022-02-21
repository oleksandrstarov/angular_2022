import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ThemeSwitchService } from './theme-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SoulTeam Weather';

  isDarkMode!: boolean;

  constructor(public themeSwitchService: ThemeSwitchService) { }
  
  ngOnInit(): void {
    this.themeSwitchService.initTheme();
    // const currentTheme: string | null = this.themeSwitchService.getCurrentTheme();

    // if (!currentTheme) {
    //   this.isDarkMode = false;
    //   this.themeSwitchService.setTheme('light');
    // }
    // if (currentTheme === 'light') {
    //   this.isDarkMode = false;
    // }
    // if (currentTheme === 'dark') {
    //   this.isDarkMode = true;
    // }
  }

  // toggleTheme() {
  //   console.log('1');
  //   if (this.isDarkMode === false) {
  //     console.log('2')
  //     this.isDarkMode = true;
  //     console.log('3')
  //     console.log(this.isDarkMode)
  //     this.themeSwitchService.setTheme('dark');
  //     console.log('4')
  //     return;
  //   }

  //   if (this.isDarkMode === true) {
  //     console.log('5')
  //     this.isDarkMode = false;
  //     console.log(this.isDarkMode)
  //     console.log('6')
  //     this.themeSwitchService.setTheme('light');
  //     console.log('7')
  //     return;
  //   }
  // }
}
