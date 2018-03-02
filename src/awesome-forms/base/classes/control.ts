import { AfterViewInit, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { AbstractControlDirective, ControlValueAccessor, ValidationErrors, } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AwesomeControlValueAccessor } from './control-value-accessor';

export abstract class AwesomeControl<T = any, I = T> extends AwesomeControlValueAccessor<T, I>
  implements AfterViewInit, ControlValueAccessor, AbstractControlDirective {
  @Input()
  set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  @Input() required: boolean;

  @ViewChild('input') input: ElementRef;

  protected _focused = false;
  get focused(): boolean {
    return this._focused;
  }

  get empty(): boolean {
    return this.value === null || this.value === undefined || <any>this.value === '';
  }

  get previousValue(): T { return this._previousValue; }

  ngAfterViewInit() {
    this.setupFocus();
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.internalControl.disable();
    } else {
      this.internalControl.enable();
    }
  }

  setupFocus() {
    // doing it this way allows us to easily extend this component
    const elem: HTMLInputElement = this.input.nativeElement;

    this.renderer.listen(elem, 'focus', () => ((this._focused = true)));
    this.renderer.listen(elem, 'blur', () => (this.propagateTouched(), (this._focused = false)));
  }

  @HostBinding('class.awesome-error-state')
  get errorState(): boolean {
    // show if they've visited the field, typed something and left or if the form has been submitted
    const showError = (this.touched && this.dirty) || (this.submitted);

    return showError && this.invalid;
  }

  get submitted() {
    return this.form && this.form.submitted;
  }

  // pass through AbstractControlDirective properties

  get value(): T { return this.control.value; }

  get valid(): boolean | null { return this.control.valid; }

  get invalid(): boolean | null { return this.control.invalid; }

  get pending(): boolean | null { return this.control.pending; }

  get disabled(): boolean | null { return this.control.disabled; }

  get enabled(): boolean | null { return this.control.enabled; }

  get errors(): ValidationErrors | null { return this.control.errors; }

  get pristine(): boolean | null { return this.control.pristine; }

  get dirty(): boolean | null { return this.control.dirty; }

  get touched(): boolean | null { return this.control.touched; }

  get status(): string | null { return this.control.status; }

  get untouched(): boolean | null { return this.control.untouched; }

  get statusChanges(): Observable<any> | null { return this.control.statusChanges; }

  get valueChanges(): Observable<T> | null { return this.control.valueChanges; }

  get path(): string[] | null { return null; }

  reset(value?: T): void { this.control.reset(value); }

  hasError(errorCode: string, path?: string[]): boolean { return this.control.hasError(errorCode, path); }

  getError(errorCode: string, path?: string[]): any { return this.control.getError(errorCode, path); }

  // end: pass through AbstractControlDirective properties
}
