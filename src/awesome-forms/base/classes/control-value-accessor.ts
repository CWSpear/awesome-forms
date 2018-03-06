import { ElementRef, OnDestroy, OnInit, Optional, Renderer2, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

import { AwesomeFormFieldComponent } from '../form-field/form-field.component';

/**
 * Intended use when extending `TcControlValueAccessor`:
 *
 * ```html
 * <internal-control
 *   #input
 *   [formControl]="internalControl"
 * ></internal-control>
 * ```
 */
export abstract class AwesomeControlValueAccessor<T = any, I = T> implements ControlValueAccessor, OnInit, OnDestroy {
  internalControl: AbstractControl = new FormControl();

  propagateChange: (newVal: T) => void;
  propagateTouched: () => void;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  protected _previousValue: T;
  internalValue: I;

  get control(): AbstractControl {
    return this.ngControl.control || <AbstractControl>{};
  }

  get form(): FormGroupDirective | NgForm {
    return this.formGroupDirective || this.ngForm;
  }

  constructor(
    protected renderer: Renderer2,
    @Self() protected elementRef: ElementRef,
    @Optional() protected formGroupDirective: FormGroupDirective,
    @Optional() protected ngForm: NgForm,
    @Optional() @Self() protected ngControl: NgControl,
    @Optional() public formField: AwesomeFormFieldComponent,
    protected formBuilder: FormBuilder,
  ) {
    this.ngControl.valueAccessor = <ControlValueAccessor>this;
  }

  ngOnInit() {
    this.setUpSubscription();
  }

  ngOnDestroy() {
    this.destroyed$.next(false);
    this.destroyed$.complete();
  }

  setUpSubscription() {
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((internalValue: I) => {
        this.internalValue = internalValue;
        const newValue = this.convertFromInternalValue(internalValue);
        if (!this.valueCompare(this.control.value, newValue)) {
          this.propagateChange(newValue);
        }
      });
  }

  writeValue(value: T) {
    this.setValue(value);
  }

  setValue(value: T) {
    this._previousValue = this.internalControl.value;
    this.internalControl.setValue(this.convertToInternalValue(value));
  }

  registerOnChange(fn: (newVal: T) => void) {
    this.propagateChange = (newVal: T) => {
      this._previousValue = this.control.value;
      fn(newVal);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  protected convertFromInternalValue(internalValue: any): T {
    return internalValue;
  }

  protected convertToInternalValue(value: T): any {
    return value;
  }

  protected valueCompare(oldVal: T, newVal: T): boolean {
    // cast undefined and '' to null
    return this.coerceEmptyToNull(oldVal) === this.coerceEmptyToNull(newVal);
  }

  protected coerceEmptyToNull(val: any): any | null {
    if (val === undefined || val === '') {
      return null;
    }

    return val;
  }
}
