import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbideenComponent } from './forbideen.component';

describe('ForbideenComponent', () => {
  let component: ForbideenComponent;
  let fixture: ComponentFixture<ForbideenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbideenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbideenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
