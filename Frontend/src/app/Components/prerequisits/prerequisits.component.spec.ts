import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitsComponent } from './prerequisits.component';

describe('PrerequisitsComponent', () => {
  let component: PrerequisitsComponent;
  let fixture: ComponentFixture<PrerequisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerequisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
