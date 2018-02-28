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

const components = [
  AwesomeFormFieldDirective,

  TextComponent,

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
