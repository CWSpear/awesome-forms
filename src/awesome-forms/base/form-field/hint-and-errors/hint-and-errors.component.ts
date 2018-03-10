import { AfterViewInit, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AwesomeFormFieldComponent } from '../form-field.component';

@Component({
  selector: 'awesome-hint-and-errors',
  templateUrl: './hint-and-errors.component.html',
  styleUrls: ['./hint-and-errors.component.scss'],
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
export class AwesomeHintAndErrorsComponent<T = any> implements AfterViewInit {
  animationState: string;

  constructor(
    public formField: AwesomeFormFieldComponent<T>,
  ) {}

  ngAfterViewInit() {
    // avoid animations on load
    // TODO: without setTimeout, we get ExpressionChangedAfterItHasBeenCheckedError error,
    // but with timeout, we get inefficient double check
    setTimeout(() => (this.animationState = 'enter'));

    if (!this.formField) {
      throw new Error(`${this.constructor.name} must be placed inside a ${AwesomeFormFieldComponent.name}`);
    }
  }
}
