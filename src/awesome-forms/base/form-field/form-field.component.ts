import { AfterViewInit, Component, ContentChild, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { AwesomeControl } from '../classes/control';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
  animations: [
    trigger('transitionMessages', [
      state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
    ]),
  ],
})
export class AwesomeFormFieldComponent<T = any> implements AfterViewInit {
  @Input() label: string;
  @Input() hint: string;

  private errorMessageMap = defaultErrorMessages;

  errorMessagesArray: ErrorMessage[] = this.errorMessageMapToArray(this.errorMessageMap);
  animationState: string;

  @Input() set errorMessages(errorMessageMap: ErrorMessageMap) {
    this.updateErrorMessages(errorMessageMap);
  }

  @HostBinding('class') classes = 'tc-input-container tc-form-field';

  @HostBinding('class.tc-is-required') get isRequired(): boolean {
    return this.control && this.control.required;
  }

  @ContentChild(forwardRef(() => AwesomeControl)) control: AwesomeControl<T>;
  @ContentChildren(forwardRef(() => AwesomeErrorComponent)) errorChildren: QueryList<AwesomeErrorComponent>;
  @ContentChildren(AwesomePrefixDirective) prefixChildren: QueryList<AwesomePrefixDirective>;
  @ContentChildren(AwesomeSuffixDirective) suffixChildren: QueryList<AwesomeSuffixDirective>;

  @HostBinding('class.tc-is-in-error-state')
  get showError() {
    return this.control && this.control.errorState;
  }

  ngAfterViewInit() {
    // avoid animations on load
    // TODO: without setTimeout, we get ExpressionChangedAfterItHasBeenCheckedError error, with timeout, we get inefficient double check
    setTimeout(() => this.animationState = 'enter');

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

    console.log(this.errorMessageMap);
  }

  // allows child elements to override the hint (or set a default if one does not exist)
  setHint(hint: string, overrideExisting = true) {
    if (!this.hint || overrideExisting) {
      this.hint = hint;
    }
  }

  private errorMessageMapToArray(errorMessages: ErrorMessageMap) {
    return Object.keys(errorMessages).map((key: string) => ({ key, message: errorMessages[key] }));
  }
}
