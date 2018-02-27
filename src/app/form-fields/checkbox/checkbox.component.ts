import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';

@Component({
  selector: 'awesome-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: CheckboxComponent }],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends AwesomeFormField<string> {}
