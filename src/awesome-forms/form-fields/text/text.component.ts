import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AwesomeControl } from '../../base/classes/control';

@Component({
  selector: 'awesome-text',
  exportAs: 'awesomeText',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{ provide: AwesomeControl, useExisting: TextComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends AwesomeControl<string> implements OnInit {
  ngOnInit() {
    super.ngOnInit();

    if (this.formField) {
      this.formField.updateErrorMessages({
        minlength: 'You are {actualLength}/{requiredLength} the way there!',
      });
    }
  }
}
