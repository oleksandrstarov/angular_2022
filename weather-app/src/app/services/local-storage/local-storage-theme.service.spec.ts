import { TestBed } from '@angular/core/testing';

import { LocalStorageThemeService } from './local-storage-theme.service';

describe('ThemeSwitchService', () => {
  let service: LocalStorageThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
