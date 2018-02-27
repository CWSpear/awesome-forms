import { Input } from '@angular/core';

import { AwesomeControlValueAccessor } from './control-value-accessor';
import { ErrorMessageMap } from '../components/form-widget/form-widget.component';

export abstract class AwesomeFormGroup<T> extends AwesomeControlValueAccessor<T> {
  @Input() disabled = false;
  @Input() hint: string;
  @Input() label: string;
  @Input() required: boolean;
  @Input() minlength: number;

  @Input() errorMessages: ErrorMessageMap;
}
