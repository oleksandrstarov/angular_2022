import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FovoritesListComponent } from './fovorites-list.component';

describe('FovoritesListComponent', () => {
  let component: FovoritesListComponent;
  let fixture: ComponentFixture<FovoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FovoritesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FovoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
