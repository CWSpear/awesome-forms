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
export abstract class AwesomeControlValueAccessor<ControlModel = any, InternalControlModel = ControlModel>
  implements ControlValueAccessor, OnInit, OnDestroy {
  internalControl: AbstractControl = new FormControl();

  propagateChange: (newVal: ControlModel) => void;
  propagateTouched: () => void;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  protected _previousValue: ControlModel;
  internalValue: InternalControlModel;

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
      .subscribe((internalValue: InternalControlModel) => {
        this.internalValue = internalValue;
        const newValue = this.convertFromInternalValue(internalValue);
        if (!this.valueCompare(this.control.value, newValue)) {
          this.propagateChange(newValue);
        }
      });
  }

  writeValue(value: ControlModel) {
    this.setValue(value);
  }

  setValue(value: ControlModel, silent = false) {
    if (silent) {
      // Sometimes, certain events will change properties on the control externally, and updating the control normally
      // will cause infinite loops or other issues. The silent flag allows us to update things without those risks.
      // USE WITH CARE!

      // these wouldn't otherwise get updated in a silent update
      this._previousValue = this.control.value;
      this.internalValue = this.convertToInternalValue(value);

      this.internalControl.setValue(this.internalValue, { emitEvent: false });

      this.control.setValue(value, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      });
    } else {
      this.internalControl.setValue(this.convertToInternalValue(value));
    }
  }

  registerOnChange(fn: (newVal: ControlModel) => void) {
    this.propagateChange = (newVal: ControlModel) => {
      this._previousValue = this.control.value;
      fn(newVal);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  protected convertFromInternalValue(internalValue: any): ControlModel {
    return internalValue;
  }

  protected convertToInternalValue(value: ControlModel): any {
    return value;
  }

  protected valueCompare(oldVal: ControlModel, newVal: ControlModel): boolean {
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
