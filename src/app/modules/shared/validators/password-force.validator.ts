import {
  AbstractControl
} from '@angular/forms';

export function ValidatePasswordForce(control: AbstractControl) {
  let string,
  checkSpecialCharacter;

  const specialChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  let erro = false;
  string = control.value;
  checkSpecialCharacter = false;
  let msg = '';
  if (string && string.length > 0) {
    if (!/[a-z]/g.test(string)) {
      return {
        validate: false,
        message: 'A senha precisa ter ao menos uma letra minúscula'
      };
    }

    if (!/[A-Z]/g.test(string)) {
      return {
        validate: false,
        message: 'A senha precisa ter ao menos uma letra maiúscula'
      };
    }

    if (!/[0-9]/g.test(string)) {
      return {
        validate: false,
        message: 'A senha precisa ter ao menos um número'
      };
    }

    if (!specialChar.test(string)) {
      if (!checkSpecialCharacter) {
        return {
          validate: false,
          message: 'A senha precisa ter ao menos um caractere especial'
        };
      }
    }

    if (string.length < 8) {
      return {
        validate: false,
        message: 'A senha precisa ter ao menos 8 caracteres'
      };
    }
  }

  return null;
}
