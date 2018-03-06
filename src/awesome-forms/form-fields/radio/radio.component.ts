import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { RadioOptionComponent } from './radio-option/radio-option.component';
import { AwesomeControl } from '../../base/classes/control';

@Component({
  selector: 'awesome-radio',
  exportAs: 'awesomeRadio',
  template: '<ng-content></ng-content>',
  styleUrls: ['./radio.component.scss'],
  providers: [{ provide: AwesomeControl, useExisting: RadioComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends AwesomeControl {
  static uniqueIdCounter = 0;
  uniqueId = `awesome-radio-${RadioComponent.uniqueIdCounter++}`;

  @Input() name: string;

  @ContentChildren(RadioOptionComponent) inputs: QueryList<RadioOptionComponent> = <any>[];

  setupFocus() {
    this.focusHelper(this.inputs);
  }
}
