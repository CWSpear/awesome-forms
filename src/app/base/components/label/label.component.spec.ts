import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeLabelComponent } from './label.component';

describe('AwesomeLabelComponent', () => {
  let component: AwesomeLabelComponent;
  let fixture: ComponentFixture<AwesomeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomeLabelComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
