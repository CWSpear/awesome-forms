import { OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

export abstract class AwesomeControlValueAccessor<T> implements ControlValueAccessor, OnInit, OnDestroy {
  internalControl: FormControl = new FormControl();

  propagateChange: (newVal: T) => void;
  propagateTouched: () => void;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  protected _previousValue: T;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = <ControlValueAccessor>this;
  }

  ngOnInit() {
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newVal) => {
        if (!this.valueCompare(this._previousValue, newVal)) {
          this.propagateChange(newVal);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(false);
    this.destroyed$.complete();
  }

  writeValue(value: T) {
    this.internalControl.setValue(value);
  }

  registerOnChange(fn: (newVal: T) => void) {
    this.propagateChange = (newVal: T) => {
      this._previousValue = newVal;
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
