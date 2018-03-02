import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TextComponent } from './form-fields/text/text.component';
import { AwesomeFormFieldComponent } from './base/form-field/form-field.component';
import { AwesomeErrorComponent } from './base/error/error.component';
import { AwesomeHintComponent } from './base/hint/hint.component';
import { AwesomeLabelComponent } from './base/label/label.component';
import { AwesomeControlDirective } from './base/control-directive/control.directive';
import { SelectComponent } from './form-fields/select/select.component';
import { OptionComponent } from './form-fields/select/option/option.component';
import { RadioComponent } from './form-fields/radio/radio.component';
import { RadioOptionComponent } from './form-fields/radio/radio-option/radio-option.component';

const components = [
  AwesomeControlDirective,

  TextComponent,
  SelectComponent,
  OptionComponent,
  RadioComponent,
  RadioOptionComponent,

  AwesomeFormFieldComponent,
  AwesomeErrorComponent,
  AwesomeHintComponent,
  AwesomeLabelComponent,
];

@NgModule({
  imports: [
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
  providers: [],
})
export class AwesomeFormsModule {}
