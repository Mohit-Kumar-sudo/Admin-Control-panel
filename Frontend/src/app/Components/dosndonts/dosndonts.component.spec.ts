import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosndontsComponent } from './dosndonts.component';

describe('DosndontsComponent', () => {
  let component: DosndontsComponent;
  let fixture: ComponentFixture<DosndontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosndontsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosndontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
