import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeControl } from '../../base/classes/control';

@Component({
  selector: 'awesome-text',
  exportAs: 'awesomeControl',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{ provide: AwesomeControl, useExisting: TextComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends AwesomeControl<string> {}
