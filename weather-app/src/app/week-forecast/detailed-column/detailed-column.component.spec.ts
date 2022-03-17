import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedColumnComponent } from './detailed-column.component';

describe('DetailedColumnComponent', () => {
  let component: DetailedColumnComponent;
  let fixture: ComponentFixture<DetailedColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
