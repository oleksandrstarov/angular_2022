import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCityListService {
  private readonly localStorageKey: string = 'favoriteCities';

  private favoriteCitiesSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public favoriteCities: Observable<string[]> = this.favoriteCitiesSource.asObservable();

  constructor() {
    this.favoriteCitiesSource.next(this.getFromLocalStorage());
  }

  isFavorite(cityName: string): boolean {
      return this.favoriteCitiesSource.value.includes(cityName);
  }

  addFavorite(cityName: string): void {
    const favoriteCities = this.favoriteCitiesSource.value;
    if (favoriteCities.includes(cityName)) {
      return;
    }
    favoriteCities.push(cityName);
    this.setInLocalStorage(favoriteCities);
    this.favoriteCitiesSource.next(favoriteCities);
  }

  removeFavorite(city: string): void {
    const filtered = this.favoriteCitiesSource.value.filter(item => item !== city);
    this.setInLocalStorage(filtered);
    this.favoriteCitiesSource.next(filtered);
  }

  private getFromLocalStorage(): Array<string> {
      return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  private setInLocalStorage(cities: string[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cities));
  }
}
