import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { AwesomeControl } from '../../base/classes/control';

@Component({
  selector: 'awesome-select',
  exportAs: 'awesomeSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: AwesomeControl, useExisting: SelectComponent }],
})
export class SelectComponent extends AwesomeControl<any> {
  @Input() options: { id: string; value: any, label: string }[];

  @ContentChildren(OptionComponent) awesomeOptions: QueryList<OptionComponent>;
}
