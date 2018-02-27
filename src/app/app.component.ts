import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'awesome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  required = false;
  disabled = false;
  control = new FormControl();
  text: string;
  textTwo: string;

  controlRequired = false;
}
