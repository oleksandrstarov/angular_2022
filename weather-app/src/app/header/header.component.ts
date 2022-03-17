import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageThemeService } from 'src/app/services/local-storage/local-storage-theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
  
export class HeaderComponent implements OnInit{
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onThemeSwitcherClick = new EventEmitter();

  isChecked: boolean = false;

  constructor(public localStorageThemeService: LocalStorageThemeService) {
  }

  onThemeSwitcherButtonClick() {
    this.onThemeSwitcherClick.emit();
  }

  ngOnInit() {
    const currentTheme: string | null = this.localStorageThemeService.getCurrentTheme();
    if (currentTheme === 'dark') {
      this.isChecked = true;
    }
  }
}
