import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AwesomeFormsModule } from '../awesome-forms/awesome-forms.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AwesomeFormsModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
