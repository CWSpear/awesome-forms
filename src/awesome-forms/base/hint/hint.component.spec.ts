import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeHintComponent } from './hint.component';

describe('AwesomeHintComponent', () => {
  let component: AwesomeHintComponent;
  let fixture: ComponentFixture<AwesomeHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomeHintComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
