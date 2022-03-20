import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {
  private baseApiUrl: string;
  private apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  getCities(locationQuery: string): Observable<Object> {
    return this.httpClient.get(`${this.baseApiUrl}/search.json`, {
      params: {
        key: this.apiKey,
        q: locationQuery
      } 
    });
  }
}
