import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitivitiesComponent } from './sensitivities.component';

describe('SensitivitiesComponent', () => {
  let component: SensitivitiesComponent;
  let fixture: ComponentFixture<SensitivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensitivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensitivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
