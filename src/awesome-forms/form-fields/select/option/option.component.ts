import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'awesome-option',
  template: '<ng-content></ng-content>',
})
export class OptionComponent {
  @Input() value: string;
  @Input() ngValue: any;

  get label() {
    return (<HTMLElement>this.elementRef.nativeElement).innerText;
  }

  constructor(
    private elementRef: ElementRef,
  ) {}
}
