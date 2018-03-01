# Awesome Forms

*Note that `awesome` is just a placeholder prefix for a real name.*

The purpose of this mini-framework is to make it very easy to create reproducible form groups (i.e. the actual input + label, hint, errors, etc), and to give `NgControl` a more powerful interface `AwesomeFormField`.

### Markup

The basic idea in simplified HTML is to turn this:

```html
<awesome-form-widget label="Label" hint="Hint" errorMessages="{}">
  <input awesomeFormField />
</awesome-form-widget>
```

into this:

```html
<div>
  <label>Label</label>
  <input />
  <div *ngIf="!error">Hint</div>
  <div *ngIf="error1">Error 1</div>
  <div *ngIf="error1">Error 2</div>
</div>
```

We want to create that structure, *and* automatically show/hide the errors/hints based on whether or not we should show a hint or an error (which we only want to show errors if the field is not only invalid, but touched and dirty or if the form has been submitted).

### Control Interface

We also want to create a higher level control (`AwesomeFormField`) that we can access in other components that will give us more insight into that form field than `NgControl` offers. 

Such as a quick way to know if the form has submitted from the control, as well as extra properties, such as `empty` and `focused` (these are in addition to all of the `AbstractControlDirective` properties that are supported, such as `touched` and `valid`).

### Extensibility

It should be very easy to make custom form fields that extend the `AwesomeFormField` (which implements `ControlValueAccessor`). 

#### Simple Text Example

For example, if you wanted to recreate a simple text input component (as opposed to using the directive), it's as simple as this Component definition:

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';

@Component({
  selector: 'awesome-text',
  exportAs: 'awesomeFormField',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: TextComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends AwesomeFormField<string> {}
```

and this markup:

```html
<input
  #input
  type="text"
  [formControl]="internalControl"
/>
```

The only 2 requirements in the markup is that you must pass in the internal control: `[formControl]="internalControl"`. This will synchronize all of the values and error handling with the lower level input's `ControlValueAccessor` and your custom component's `ControlValueAccessor`.

The `#input` is required to do some of the low level stuff, such as adding `focus`/`blur` listeners to determine focus state (see an example below of overriding how this behaves).

Any validation directives (i.e. `[minlength]="5"`) that you add to the high level component will work with your component and there is no need to add them to the low level `input` element in the HTML.

#### Multi-Component Example

If you have a slightly more complicated example with multiple inputs, you can still manage this. Basically, the only things you'd need to override are the hooks for disabled and focus:

```ts
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';
import { RadioOptionComponent } from './radio-option/radio-option.component';

@Component({
  selector: 'awesome-radio',
  exportAs: 'awesomeFormField',
  template: '<ng-content></ng-content>',
  styleUrls: ['./radio.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: RadioComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends AwesomeFormField<any> {
  @Input() name: string;

  @ContentChildren(RadioOptionComponent) inputs: QueryList<RadioOptionComponent> = <any>[];

  setDisabledState(isDisabled: boolean) {
    this.inputs.forEach((input: RadioOptionComponent) => {
      this.renderer.setProperty(input.nativeElement, 'disabled', isDisabled);
    });
  }

  setupFocus() {
    this.inputs.forEach((input: RadioOptionComponent) => {
      this.renderer.listen(input.nativeElement, 'focus', () => ((this._focused = true)));
      this.renderer.listen(input.nativeElement, 'blur', () => (this.propagateTouched(), (this._focused = false)));
    });
  }
}
```

Then just make sure all of the `input[type="radio"]` elements have `[formControl]="internalControl"`. See the markup for [radio-option.component.html](src/awesome-forms/form-fields/radio/radio-options/radio-options.component.html).

#### 3rd Party Components

Any component that implements `ControlValueAccessor` should work with very little effort, just a light wrapper. You'd just have to pass any values you want to pass through. For example, if you wanted to wrap `ng-select`

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AwesomeFormField } from '../../base/classes/form-field';

@Component({
  selector: 'awesome-my-select',
  exportAs: 'awesomeFormField',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.scss'],
  providers: [{ provide: AwesomeFormField, useExisting: MySelectComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MySelectComponent extends AwesomeFormField<any> {
  @Input() items;
  // you'd probably want to add any other `ng-select` options you'd use
  
  setDisabledState(isDisabled: boolean) {
    // override to do nothing, handled with the inherited `disable` property directly
  }

  setupFocus() {
    // override to do nothing, handled below
  }

  onBlur() {
    this.propagateTouched();
    this._isFocused = false;
  }
 
  onFocus() {
    this._isFocused = true;
  }
}
```

and the Markup:

```html
<ng-select
  #input
  [disabled]="disabled"
  [items]="items"
  (blur)="onBlur()"
  (focus)="onFocus()"
>
</ng-select>
```
