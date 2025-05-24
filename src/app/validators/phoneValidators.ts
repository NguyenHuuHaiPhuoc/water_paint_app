import { AbstractControl, ValidationErrors } from "@angular/forms";

export function phoneValidators(control: AbstractControl): ValidationErrors | null{
    const isValid = /^(03|05|07|08|09)[0-9]{8}$/.test(control.value);
  return isValid ? null : { invalidPhone: true };
}