import { AfterViewInit, Component, ContentChild, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { AwesomeControl } from '../classes/control';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AwesomeErrorComponent } from '../error/error.component';

export interface ErrorMessage {
  key: string;
  message: string;
}

const defaultErrorMessages: ErrorMessageMap = {
  minlength: 'This field is too short.',
  required: 'This field is required.',
};

export interface ErrorMessageMap {
  [key: string]: string;
}

@Component({
  selector: 'awesome-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss'],
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
export class AwesomeFormWidgetComponent<T> implements AfterViewInit {
  @Input() label: string;
  @Input() hint: string;

  errorMessagesArray: ErrorMessage[] = this.errorMessageMapToArray(defaultErrorMessages);
  animationState: string;

  @Input() set errorMessages(errorMessageMap: ErrorMessageMap) {
    const errorMessages = {
      ...defaultErrorMessages,
      ...errorMessageMap,
    };

    this.errorMessagesArray = this.errorMessageMapToArray(errorMessages);
  }

  @HostBinding('class.awesome-required') get awesomeRequired(): boolean {
    return this.control && this.control.required;
  }

  @ContentChild(AwesomeControl) control: AwesomeControl<T>;
  @ContentChildren(AwesomeErrorComponent) errorChildren: QueryList<AwesomeErrorComponent>;

  @HostBinding('class.awesome-error-state')
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

  private errorMessageMapToArray(errorMessages: ErrorMessageMap) {
    return Object.keys(errorMessages).map((key: string) => ({ key, message: errorMessages[key] }));
  }
}
