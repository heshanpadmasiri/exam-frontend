import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterToModuleComponent} from './register-to-module.component';

describe('RegisterToModuleComponent', () => {
  let component: RegisterToModuleComponent;
  let fixture: ComponentFixture<RegisterToModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterToModuleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterToModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
