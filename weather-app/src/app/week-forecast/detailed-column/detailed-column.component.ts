import { Component } from '@angular/core';

@Component({
  selector: 'app-detailed-column',
  templateUrl: './detailed-column.component.html',
  styleUrls: ['./detailed-column.component.scss']
})
export class DetailedColumnComponent {
  curentWeatherIconUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/029d142b34871bcbc90d7cd46081c50310c831c5/production/fill/svg/overcast-day-fog.svg';

  constructor() { }
}
