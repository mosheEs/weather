import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSummeryCardComponent } from './weather-summery-card.component';

describe('WeatherSummeryCardComponent', () => {
  let component: WeatherSummeryCardComponent;
  let fixture: ComponentFixture<WeatherSummeryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherSummeryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSummeryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
