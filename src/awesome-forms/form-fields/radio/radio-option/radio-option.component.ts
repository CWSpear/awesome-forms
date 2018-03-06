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
  static uniqueIdCounter = 0;
  uniqueId = `awesome-radio-option-${RadioOptionComponent.uniqueIdCounter++}`;

  @Input() value: string;

  name: string;

  @ViewChild('input') input: ElementRef;

  get nativeElement(): HTMLElement {
    return this.input.nativeElement;
  }

  constructor(
    @Inject(forwardRef(() => RadioComponent)) public radio: RadioComponent,
  ) {}

  ngOnInit() {
    if (!this.radio) {
      throw new Error(`${this.constructor.name} may only be used inside of a ${RadioComponent.name} component.`);
    }

    this.name = this.radio.name || this.radio.uniqueId;
  }
}
