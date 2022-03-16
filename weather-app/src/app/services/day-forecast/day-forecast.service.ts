import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayForecastService {
  private baseApiUrl: string;
  private apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  getDayForecast(location: string) {
    return this.httpClient.get(`${this.baseApiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=1`)
      .subscribe(response => console.log(response))
  }
}
