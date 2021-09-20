import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const minLengthArrayValidator = (min: number) => {
  return (c: AbstractControl): null | { [key: string]: any } => {
    if (c.value.length >= min)
      return null;

    return { minLengthArray: true };
  }
}

export const maxLengthArrayValidator = (max: number) => {
  return (c: AbstractControl): null | { [key: string]: any } => {
    if (c.value.length <= max)
      return null;

    return { maxArrayLengtg: true };
  }
}

// custom validator to check that two fields match
export const mustMatchValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (formGroup: AbstractControl) => {
    const control: AbstractControl = (formGroup as FormGroup).controls[controlName];
    const matchingControl: AbstractControl = (formGroup as FormGroup).controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  }
}
