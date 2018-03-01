import { Component, ElementRef, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { RadioComponent } from '../radio.component';

let count = 0;

function id() {
  return `radio-option-${count++}`;
}

@Component({
  selector: 'awesome-radio-option',
  templateUrl: './radio-option.component.html',
})
export class RadioOptionComponent implements OnInit {
  @Input() value: string;

  name: string;
  id: string;

  @ViewChild('input') input: ElementRef;

  get nativeElement(): HTMLElement {
    return this.input.nativeElement;
  }

  constructor(
    @Inject(forwardRef(() => RadioComponent)) public radio: RadioComponent,
  ) {
    this.id = id();
  }

  ngOnInit() {
    if (!this.radio) {
      throw new Error(`${this.constructor.name} may only be used inside of a ${RadioComponent.name} component.`);
    }

    if (!this.radio.name) {
      throw new Error(`${RadioComponent.name} must have a [name] property.`);
    }

    this.name = this.radio.name;
  }
}
