import { ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, ControlValueAccessor, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AwesomeControlValueAccessor } from './control-value-accessor';

export abstract class AwesomeFormField<T> extends AwesomeControlValueAccessor<T> implements ControlValueAccessor, OnInit, AbstractControlDirective {
  @Input()
  set awesomeDisabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  @Input() required: boolean;

  @ViewChild('input') input: ElementRef;

  internalControl: FormControl = new FormControl();

  protected _focused: boolean;
  get focused(): boolean {
    return this._focused;
  }

  get empty(): boolean {
    return this.value === null || this.value === undefined || <any>this.value === '';
  }

  get control(): AbstractControl {
    return this.ngControl.control || {};
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupFocus();
  }

  setDisabledState(isDisabled: boolean) {
    this.input.nativeElement.disabled = isDisabled;
  }

  setupFocus() {
    // doing it this way allows us to easily extend this component
    const elem: HTMLInputElement = this.input.nativeElement;

    elem.addEventListener('focused', () => (this._focused = true));
    elem.addEventListener('blur', () => (this._focused = false));
  }

  get previousValue(): T { return this._previousValue; }

  // pass through AbstractControlDirective properties
  get value(): any { return this.control.value; }

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

  get valueChanges(): Observable<any> | null { return this.control.valueChanges; }

  get path(): string[] | null { return null; }

  reset(value?: any): void { this.control.reset(value); }

  hasError(errorCode: string, path?: string[]): boolean { return this.control.hasError(errorCode, path); }

  getError(errorCode: string, path?: string[]): any { return this.control.getError(errorCode, path); }
}