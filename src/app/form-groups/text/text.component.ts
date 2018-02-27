import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeFormGroup } from '../../base/classes/form-group';

@Component({
  selector: 'awesome-form-group-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFormGroupComponent extends AwesomeFormGroup<string> {}
