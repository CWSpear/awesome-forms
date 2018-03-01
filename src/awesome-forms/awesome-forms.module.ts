import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TextComponent } from './form-fields/text/text.component';
import { AwesomeFormWidgetComponent } from './base/form-widget/form-widget.component';
import { AwesomeErrorComponent } from './base/error/error.component';
import { AwesomeHintComponent } from './base/hint/hint.component';
import { AwesomeLabelComponent } from './base/label/label.component';
import { AwesomeFormFieldDirective } from './base/form-field/form-field.directive';
import { SelectComponent } from './form-fields/select/select.component';
import { OptionComponent } from './form-fields/select/option/option.component';
import { RadioComponent } from './form-fields/radio/radio.component';
import { RadioOptionComponent } from './form-fields/radio/radio-option/radio-option.component';

const components = [
  AwesomeFormFieldDirective,

  TextComponent,
  SelectComponent,
  OptionComponent,
  RadioComponent,
  RadioOptionComponent,

  AwesomeFormWidgetComponent,
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
