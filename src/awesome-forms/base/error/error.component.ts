import { Component, Input } from '@angular/core';
import { AwesomeControl } from '../classes/control';

@Component({
  selector: 'awesome-error',
  template: '<ng-content></ng-content>{{ interpolatedMessage }}',
  styleUrls: ['./error.component.scss'],
})
export class AwesomeErrorComponent {
  @Input() control: AwesomeControl;
  @Input() key: string;

  @Input() set message(message: string) {
    this.interpolate = this.template(message);
  }

  get interpolatedMessage(): string {
    if (this.key && this.control && this.interpolate && this.control.hasError(this.key)) {
      return this.interpolate(this.control.errors[this.key]);
    } else {
      return '';
    }
  }

  interpolate: (obj: any) => string;

  private template(original: string): (obj: { [key: string]: string }) => string {
    return (data: { [key: string]: string }): string => {
      let str = original;
      let match;
      while (match = /{([\s\S]+?)}/g.exec(str)) {
        str = str.replace(match[0], data[match[1]]);
      }

      return str;
    };
  }
}
