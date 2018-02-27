import { AfterViewInit, Component, ContentChild, ContentChildren, HostBinding, Input, QueryList, } from '@angular/core';
import { AwesomeFormField } from '../../classes/form-field';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AwesomeErrorComponent } from '../error/error.component';

export interface ErrorMessage {
  key: string;
  message: string;
}

const defaultErrorMessages: ErrorMessageMap = {
  minlength: 'This field is too short.',
  required: 'This is a required field.',
};

export interface ErrorMessageMap {[key: string]: string;}

@Component({
  selector: 'awesome-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('transitionMessages', [
      state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
      transition('void => enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
    ]),
  ],
})
export class AwesomeFormWidgetComponent<T> implements AfterViewInit {
  @Input() label: string;
  @Input() hint: string;

  errorMessagesArray: ErrorMessage[];
  @Input() set errorMessages(errorMessageMap: ErrorMessageMap) {
    const errorMessages = {
      ...defaultErrorMessages,
      ...errorMessageMap,
    };

    this.errorMessagesArray = Object.keys(errorMessages).map((key: string) => ({ key, message: errorMessages[key] }));
  }

  @HostBinding('class.awesome-required') get awesomeRequired(): boolean {
    return this.formField && this.formField.required;
  }

  @ContentChild(AwesomeFormField) formField: AwesomeFormField<T>;
  @ContentChildren(AwesomeErrorComponent) _errorChildren: QueryList<AwesomeErrorComponent>;


  animationState: string;

  get subscriptType() {
    // const elems: HTMLElement[] = this.elemRef.nativeElement.querySelectorAll('awesome-error');

    return (this.formField || {}).invalid ? 'error' : 'hint';
  }

  ngAfterViewInit() {
    // avoid animations on load.
    this.animationState = 'enter';
  }
}
