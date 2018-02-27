import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input } from '@angular/core';
import { AwesomeFormField } from '../../classes/form-field';

export interface ErrorMessage {
  key: string;
  message: string;
}

@Component({
  selector: 'awesome-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.awesome-required]': 'formField.required',
  },
})
export class AwesomeFormWidgetComponent<T> {
  @Input() label: string;
  @Input() hint: string;

  @ContentChild(AwesomeFormField) formField: AwesomeFormField<T>;

  errorMessages: ErrorMessage[] = [
    {
      key: 'required',
      message: 'This is a required field',
    },
  ];

  get errorCount() {
    const elems: HTMLElement[] = this.elemRef.nativeElement.querySelectorAll('awesome-error');

    return elems ? elems.length : 0;
  }

  constructor(
    protected elemRef: ElementRef,
  ) {}
}
