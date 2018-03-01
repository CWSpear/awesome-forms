import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { AwesomeFormField } from '../classes/form-field';

// @TODO check if value changed before `writeValue` or `propagateChange`?

@Directive({
  selector: '[awesomeFormField]',
  exportAs: 'awesomeFormField',
  providers: [{ provide: AwesomeFormField, useExisting: AwesomeFormFieldDirective }],
})
export class AwesomeFormFieldDirective<T> extends AwesomeFormField<T> implements OnInit {
  @Input() type: string;

  get input() {
    return this.elementRef;
  }

  ngOnInit() {
    // to make sure it's not accidentally used
    this.internalControl = null;

    super.ngOnInit();
  }

  setUpSubscription() {
    // we don't want to use the control subscription for the directive (we use onInput instead)
  }

  writeValue(value: any): void {
    switch (this.type) {
      case 'checkbox': {
        this._previousValue = this.input.nativeElement.checked;
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
        break;
      }

      case 'text':
      default: {
        const normalizedValue = value == null ? '' : value;
        this._previousValue = this.input.nativeElement.value;
        this.renderer.setProperty(this.input.nativeElement, 'value', normalizedValue);
      }
    }
  }

  @HostListener('change', ['$event.target.checked'])
  onChange(value) {
    // this isn't needed for regular text fields (input handles it)
    if (this.type === 'checkbox') {
      this.propagateChange(value);
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    this.propagateChange(value);
  }

  @HostListener('blur')
  onBlur() {
    this._focused = false;
    this.propagateTouched();
  }

  @HostListener('focus')
  onFocus() {
    this._focused = true;
  }
}
