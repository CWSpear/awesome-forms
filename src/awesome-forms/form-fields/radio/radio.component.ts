import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { RadioOptionComponent } from './radio-option/radio-option.component';
import { AwesomeControl } from '../../base/classes/control';

@Component({
  selector: 'awesome-radio',
  exportAs: 'awesomeControl',
  template: '<ng-content></ng-content>',
  styleUrls: ['./radio.component.scss'],
  providers: [{ provide: AwesomeControl, useExisting: RadioComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends AwesomeControl {
  @Input() name: string;

  @ContentChildren(RadioOptionComponent) inputs: QueryList<RadioOptionComponent> = <any>[];

  setDisabledState(isDisabled: boolean) {
    this.inputs.forEach((input: RadioOptionComponent) => {
      this.renderer.setProperty(input.nativeElement, 'disabled', isDisabled);
    });
  }

  setupFocus() {
    // doing it this way allows us to easily extend this component
    this.inputs.forEach((input: RadioOptionComponent) => {
      this.renderer.listen(input.nativeElement, 'focus', () => ((this._focused = true)));
      this.renderer.listen(input.nativeElement, 'blur', () => (this.propagateTouched(), (this._focused = false)));
    });
  }
}
