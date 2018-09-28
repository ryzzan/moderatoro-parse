import { AbstractControl } from '@angular/forms';

export function ValidateRequired(control: AbstractControl) {
    if (!control.value || control.value === '') {
        return {
            validate: false,
            message: 'Campo obrigatório'
        };
    }

    return null;
}
