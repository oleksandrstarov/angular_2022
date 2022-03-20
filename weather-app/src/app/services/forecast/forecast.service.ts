import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private baseApiUrl: string;
  private apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  getDayForecast(location: string, days: number): Observable<Object> {
    return this.httpClient.get(`${this.baseApiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=${days}`);
  }
}
