import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'SoulTeam Weather';
  currentLocationCoords: any = null // get from navigator.geolocation.getCurrentPosition;
  defaultCity: string = 'Lviv';
}
