import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTempCardComponent } from './daily-temp-card.component';

describe('DailyTempCardComponent', () => {
  let component: DailyTempCardComponent;
  let fixture: ComponentFixture<DailyTempCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTempCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTempCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
