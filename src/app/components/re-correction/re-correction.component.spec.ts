import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReCorrectionComponent} from './re-correction.component';

describe('ReCorrectionComponent', () => {
  let component: ReCorrectionComponent;
  let fixture: ComponentFixture<ReCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      declarations: [ReCorrectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
