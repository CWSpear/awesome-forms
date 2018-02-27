import { AfterViewInit, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'awesome-error',
  template: '<ng-content></ng-content>',
  styleUrls: ['./error.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomeErrorComponent {}
