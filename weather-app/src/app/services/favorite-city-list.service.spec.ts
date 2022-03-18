import { TestBed } from '@angular/core/testing';
import { FavoriteCityListService } from './favorite-city-list.service';



describe('FavoriteCityListService', () => {
  let service: FavoriteCityListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCityListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
