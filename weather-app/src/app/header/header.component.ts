import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeSwitchService } from '../theme-switch.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ThemeSwitchService]
})
export class HeaderComponent {
  // isDarkMode = false;

  @Input() isDarkMode: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClick = new EventEmitter();

  constructor() {
  }

  btnClick() {
    this.onClick.emit();
    console.log(this.isDarkMode)
  }
}
