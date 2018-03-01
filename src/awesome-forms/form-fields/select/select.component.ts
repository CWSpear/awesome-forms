import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'awesome-select',
  exportAs: 'awesomeFormField',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: SelectComponent }],
})
export class SelectComponent extends AwesomeFormField<any> {
  @Input() options: { id: string; value: any, label: string }[];

  @ContentChildren(OptionComponent) awesomeOptions: QueryList<OptionComponent>;
}
