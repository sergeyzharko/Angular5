import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
      const passwordControl = c.get('password');
      const passwordConfirmControl = c.get('repeatedPassword');

      if (passwordControl.pristine || passwordConfirmControl.pristine) {
        return null;
      }

      if (passwordControl.value === passwordConfirmControl.value) {
        return null;
      }

      return { 'passwordMatch': true };
    }

  }
