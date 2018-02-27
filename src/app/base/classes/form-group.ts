import * as _ from 'lodash';
import { Input } from '@angular/core';

import { AwesomeControlValueAccessor } from './control-value-accessor';
import { ErrorMessage } from '../components/form-widget/form-widget.component';

export interface ErrorMessageMap { [key: string]: string; }

export abstract class AwesomeFormGroup<T> extends AwesomeControlValueAccessor<T> {
  @Input() disabled = false;
  @Input() hint: string;
  @Input() label: string;
  @Input() required: boolean;

  errorsArray: ErrorMessage[];
  @Input() set errorMessages(errorMessageMap: ErrorMessageMap) {
    this.errorsArray = _.map(errorMessageMap, (message: string, key: string) => ({ key, message }));
  }
}
