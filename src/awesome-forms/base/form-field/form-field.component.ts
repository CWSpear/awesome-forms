import { AfterViewInit, Component, ContentChild, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { AwesomeControl } from '../classes/control';
import { AwesomeErrorComponent } from '../error/error.component';
import { AwesomePrefixDirective } from '../affixes/prefix.directive';
import { AwesomeSuffixDirective } from '../affixes/suffix.directive';

export interface ErrorMessage {
  key: string;
  message: string;
}

const defaultErrorMessages: ErrorMessageMap = {
  maxlength: 'This field is too long.',
  minlength: 'This field is too short.',
  required: 'This field is required.',
};

export interface ErrorMessageMap {
  [key: string]: string;
}

@Component({
  selector: 'awesome-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class AwesomeFormFieldComponent<T = any> implements AfterViewInit {
  @Input() label: string;
  @Input() hint: string;
  /* @Input() */ forceHideErrors = false;

  private errorMessageMap = defaultErrorMessages;

  errorMessagesArray: ErrorMessage[] = this.errorMessageMapToArray(this.errorMessageMap);

  @Input() set errorMessages(errorMessageMap: ErrorMessageMap) {
    this.updateErrorMessages(errorMessageMap);
  }

  @HostBinding('class.awesome-is-required')
  get isRequired(): boolean {
    return this.control && this.control.required;
  }

  @ContentChild(forwardRef(() => AwesomeControl)) control: AwesomeControl<T>;
  @ContentChildren(forwardRef(() => AwesomeErrorComponent)) errorChildren: QueryList<AwesomeErrorComponent>;
  @ContentChildren(AwesomePrefixDirective) prefixChildren: QueryList<AwesomePrefixDirective>;
  @ContentChildren(AwesomeSuffixDirective) suffixChildren: QueryList<AwesomeSuffixDirective>;

  @HostBinding('class.awesome-is-in-error-state')
  get showError() {
    return !this.forceHideErrors && this.control && this.control.errorState;
  }

  ngAfterViewInit() {
    if (!this.control) {
      throw new Error(`${this.constructor.name} must contain an ${AwesomeControl.name}`);
    }
  }

  // allow adding/updating dynamic error messages
  updateErrorMessages(errorMessageMap: ErrorMessageMap, overrideExisting = true) {
    if (overrideExisting) {
      this.errorMessageMap = {
        ...this.errorMessageMap,
        ...errorMessageMap,
      };
    } else {
      this.errorMessageMap = {
        ...errorMessageMap,
        ...this.errorMessageMap,
      };
    }

    this.errorMessagesArray = this.errorMessageMapToArray(this.errorMessageMap);
  }

  // allows child elements to override the hint (or set a default if one does not exist)
  setHint(hint: string, overrideExisting = true) {
    if (!this.hint || overrideExisting) {
      this.hint = hint;
    }
  }

  private errorMessageMapToArray(errorMessages: ErrorMessageMap): ErrorMessage[] {
    return Object.keys(errorMessages).map((key: string) => ({ key, message: errorMessages[key] }));
  }
}
