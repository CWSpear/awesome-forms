import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'awesome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  required = true;
  disabled = false;
  text: string;
  text2: string;

  submit(val) {
    console.log(val);
  }
}
