import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeFormWidgetComponent } from './form-widget.component';

describe('AwesomeFormWidgetComponent', () => {
  let component: AwesomeFormWidgetComponent;
  let fixture: ComponentFixture<AwesomeFormWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomeFormWidgetComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeFormWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
