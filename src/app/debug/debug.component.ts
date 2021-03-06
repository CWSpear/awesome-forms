import { Component, Input } from '@angular/core';
import { AwesomeControl } from '../../awesome-forms/base/classes/control';

@Component({
  selector: 'awesome-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  @Input() name: string;
  @Input() control: AwesomeControl<any>;
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
    this.control.setValue(this.valueToPick);
  }
}
