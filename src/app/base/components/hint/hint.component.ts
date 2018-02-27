import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awesome-hint',
  template: '<ng-content></ng-content>',
  styleUrls: ['./hint.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomeHintComponent {}
