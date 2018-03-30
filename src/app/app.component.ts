import { Component } from '@angular/core';
import { PopupTestComponent } from '../awesome-forms/popup/popup-test.component';
import { PopupService } from '../awesome-forms/popup/popup.service';

@Component({
  selector: 'awesome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  required = true;
  disabled = false;

  model: any = {};

  options = [
    { id: 1, value: 1, label: 'Red' },
    { id: 2, value: 2, label: 'Green' },
    { id: 3, value: 3, label: 'Blue' },
  ];

  constructor(
    private popupService: PopupService,
  ) {}

  submit(val) {
    console.log(val);
  }

  openPopup() {
    const ref = this.popupService.open(PopupTestComponent);
  }
}
