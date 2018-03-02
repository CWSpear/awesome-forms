import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeFormFieldComponent } from './form-field.component';

describe('AwesomeFormWidgetComponent', () => {
  let component: AwesomeFormFieldComponent;
  let fixture: ComponentFixture<AwesomeFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomeFormFieldComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
