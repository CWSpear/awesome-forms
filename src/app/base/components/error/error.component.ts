import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awesome-error',
  template: '<ng-content></ng-content>',
  styleUrls: ['./error.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomeErrorComponent {}
