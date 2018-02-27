import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TextComponent } from './form-fields/text/text.component';
import { CheckboxComponent } from './form-fields/checkbox/checkbox.component';
import { AwesomeFormWidgetComponent } from './base/components/form-widget/form-widget.component';
import { AwesomeErrorComponent } from './base/components/error/error.component';
import { AwesomeHintComponent } from './base/components/hint/hint.component';
import { AwesomeLabelComponent } from './base/components/label/label.component';
import { TextFormGroupComponent } from './form-groups/text/text.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,

    TextComponent,
    CheckboxComponent,

    AwesomeFormWidgetComponent,
    AwesomeErrorComponent,
    AwesomeHintComponent,
    AwesomeLabelComponent,

    TextFormGroupComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
