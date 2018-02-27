import { OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

export abstract class AwesomeControlValueAccessor<T> implements ControlValueAccessor, OnInit, OnDestroy {
  protected internalControl: FormControl = new FormControl();

  propagateChange: (newVal: T) => void;
  propagateTouched: () => void;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    @Self() public ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = <ControlValueAccessor>this;
  }

  ngOnInit() {
    this.internalControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newVal) => {
        if (!this.valueCompare(this.internalControl.value, newVal)) {
          this.propagateChange(newVal);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(false);
    this.destroyed$.complete();
  }

  writeValue(value: T) {
    this.internalControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
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
