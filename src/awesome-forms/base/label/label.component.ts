import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awesome-label',
  template: '<label><ng-content></ng-content></label>',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomeLabelComponent {}
