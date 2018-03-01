import { Component, Input } from '@angular/core';
import { AwesomeFormField } from '../../awesome-forms/base/classes/form-field';

@Component({
  selector: 'awesome-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  @Input() name: string;
  @Input() formField: AwesomeFormField<any>;
  @Input() modelValue: any;

  private _valueToPick: any;
  private valueToPickStr: string;
  @Input()
  set valueToPick(val: any) {
    this._valueToPick = val;
    this.valueToPickStr = JSON.stringify(val);
  }

  get valueToPick(): any {
    return this._valueToPick;
  }

  pickValue() {
    this.formField.control.setValue(this.valueToPick);
  }
}
