import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatisticComponent } from './form-statistic.component';

describe('FormStatisticComponent', () => {
  let component: FormStatisticComponent;
  let fixture: ComponentFixture<FormStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
