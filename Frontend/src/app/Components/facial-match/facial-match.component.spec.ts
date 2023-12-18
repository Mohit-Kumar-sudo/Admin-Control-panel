import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialMatchComponent } from './facial-match.component';

describe('FacialMatchComponent', () => {
  let component: FacialMatchComponent;
  let fixture: ComponentFixture<FacialMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacialMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacialMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
