import { FormControl } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class RegistrationValidator {



  static validatePassword(control: FormControl): ValidationResult {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!regex.test(control.value)) {
      return { 'validatePassword': true };
    }

    return null;
  }

  static validateEmail(control: FormControl): ValidationResult {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(control.value)) {
      return { 'validateEmail': true };
    }

    return null;
  }
  
  
}
