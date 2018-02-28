import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';

@Component({
  selector: 'awesome-text',
  exportAs: 'awesomeFormField',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: TextComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends AwesomeFormField<string> {}
