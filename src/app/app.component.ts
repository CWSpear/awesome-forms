import { Component } from '@angular/core';

@Component({
  selector: 'awesome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  required = true;
  disabled = false;
  text: any;
  text2: any;

  options = [
    { id: 1, value: 1, label: 'Red' },
    { id: 2, value: 2, label: 'Green' },
    { id: 3, value: 3, label: 'Blue' },
  ];

  submit(val) {
    console.log(val);
  }
}
