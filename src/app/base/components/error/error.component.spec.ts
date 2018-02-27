import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeErrorComponent } from './error.component';

describe('AwesomeHintComponent', () => {
  let component: AwesomeErrorComponent;
  let fixture: ComponentFixture<AwesomeErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomeErrorComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
