# Awesome Forms

*Note that `awesome` is just a placeholder prefix for a real name.*

The purpose of this mini-framework is to make it very easy to create reproducible form groups (i.e. the actual input + label, hint, errors, etc), and to give `NgControl` a more powerful interface `AwesomeFormField`.

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

We also want to create a higher level control (`AwesomeFormField`) that we can access in other components that will give us more insight into that form field than `NgControl` offers. 
