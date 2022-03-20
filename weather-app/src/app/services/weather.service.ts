import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseApiUrl: string;
  private apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  getCurrentWeather(locationQuery: string): Observable<Object> {
    return this.httpClient.get(`${this.baseApiUrl}/current.json`, {
      params: {
        key: this.apiKey,
        q: locationQuery
      } 
    });
  }
}
