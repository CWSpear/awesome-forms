import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TextComponent } from './form-fields/text/text.component';
import { AwesomeFormFieldComponent } from './base/form-field/form-field.component';
import { AwesomeHintComponent } from './base/hint/hint.component';
import { AwesomeErrorComponent } from './base/error/error.component';
import { AwesomeHintAndErrorsComponent } from './base/form-field/hint-and-errors/hint-and-errors.component';
import { AwesomeLabelComponent } from './base/label/label.component';
import { AwesomeControlDirective } from './base/control-directive/control.directive';
import { SelectComponent } from './form-fields/select/select.component';
import { OptionComponent } from './form-fields/select/option/option.component';
import { RadioComponent } from './form-fields/radio/radio.component';
import { RadioOptionComponent } from './form-fields/radio/radio-option/radio-option.component';
import { PopupTestComponent } from './popup/popup-test.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

const components = [
  AwesomeControlDirective,

  TextComponent,
  SelectComponent,
  OptionComponent,
  RadioComponent,
  RadioOptionComponent,

  AwesomeFormFieldComponent,
  AwesomeHintAndErrorsComponent,
  AwesomeErrorComponent,
  AwesomeHintComponent,
  AwesomeLabelComponent,

  PopupTestComponent,
  PopupComponent,
];

@NgModule({
  imports: [
    PortalModule,
    OverlayModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  providers: [
    PopupService,
  ],
  entryComponents: [
    PopupTestComponent,
  ],
})
export class AwesomeFormsModule {}
