import { AbstractControl, ValidationErrors } from "@angular/forms";

export function selectValidator(control: AbstractControl): ValidationErrors | null{
    const value = control.value;
    if (value === 'NO') {
        return { invalidOption: '' }; // Trả về lỗi
      }
    return null;
}