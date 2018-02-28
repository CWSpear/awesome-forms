import { ElementRef, OnDestroy, OnInit, Optional, Renderer2, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

export abstract class AwesomeControlValueAccessor<T> implements ControlValueAccessor, OnInit, OnDestroy {
  internalControl: AbstractControl = new FormControl();

  propagateChange: (newVal: T) => void;
  propagateTouched: () => void;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  protected _previousValue: T;

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
    @Optional() @Self() public ngControl: NgControl,
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
      .subscribe((newVal) => {
        if (!this.valueCompare(this.control.value, newVal)) {
          this.propagateChange(newVal);
        }
      });
  }

  writeValue(value: T) {
    this._previousValue = this.internalControl.value;
    this.internalControl.setValue(value);
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

  protected valueCompare(oldVal: T, newVal: T): boolean {
    // cast undefined and '' to null
    return this.coerceToNull(oldVal) === this.coerceToNull(newVal);
  }

  protected coerceToNull(val: any): any | null {
    if (val === undefined || val === '') {
      return null;
    }

    return val;
  }
}
