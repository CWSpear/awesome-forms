import { Input, OnInit, ViewChild } from '@angular/core';

import { AwesomeControlValueAccessor } from './control-value-accessor';
import { ErrorMessageMap } from '../components/form-widget/form-widget.component';
import { AwesomeFormField } from './form-field';

export abstract class AwesomeFormGroup<T> extends AwesomeControlValueAccessor<T> implements OnInit {
  @Input() disabled = false;
  @Input() hint: string;
  @Input() label: string;
  @Input() required: boolean;

  @Input() errorMessages: ErrorMessageMap;

  @ViewChild(AwesomeFormField) formField: AwesomeFormField<T>;

  registerOnTouched(fn: () => void) {
    super.registerOnTouched(fn);

    // bubble up the form field's touch propagator
    const formFieldPropagateTouched = this.formField.propagateTouched;
    this.formField.propagateTouched = () => {
      this.propagateTouched();
      formFieldPropagateTouched();
    };
  }

  get showError(): boolean {
    // show if they've visited the field, typed something and left or if the form has been submitted
    const showError = (this.control.touched && this.control.dirty) || (this.form && this.form.submitted);

    return showError && this.control.invalid;
  }
}
