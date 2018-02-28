import { ChangeDetectionStrategy, Directive, HostListener, OnInit } from '@angular/core';
import { AwesomeFormField } from '../classes/form-field';

@Directive({
  selector: '[awesomeFormField]',
  exportAs: 'awesomeFormField',
  providers: [{ provide: AwesomeFormField, useExisting: AwesomeFormFieldDirective }],
})
export class AwesomeFormFieldDirective<T> extends AwesomeFormField<T> implements OnInit {
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
    const normalizedValue = value == null ? '' : value;
    this._previousValue = this.input.nativeElement.value;
    this.renderer.setProperty(this.input.nativeElement, 'value', normalizedValue);
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
