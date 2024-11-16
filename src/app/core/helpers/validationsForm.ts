import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export const errorMessage = (formControl: string, formulario: FormGroup<any>) => {
    const errors: any = formulario.get(formControl)?.errors;
    if (errors == null || errors == undefined) return '';    
    if (errors['required']) {
      return 'Este campo es obligatorio';
    } else if (errors['minlength']) {
      return 'Este campo es demasiado corto';
    } else if (errors['maxlength']) {
      return 'Este campo supera la cantidad permitida de caracteres';
    } else if (errors['pattern']) {
      return 'Contiene caracteres no permitidos';
    } else if (errors['email']) {
      return 'No es un correo electrónico válido';
    } else if (errors['notEqual']) {
      return 'Los campos no son iguales';
    } else if (errors['invalidPassword']) {
      return "La contraseña debe tener al menos 8 caracteres e incluir letras mayúsculas, minúsculas, números y caracteres especiales. No se permiten la letra 'ñ' ni letras con tilde.";
    }
    return '';
  }
  export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_.-])[^\u00F1\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00FC\u00DC]{8,}$/;
    if (strongRegex.test(control.value)) {
      return null; // Retorna null si la validación es exitosa
    }
    return { invalidPassword: true }; // Retorna un objeto de error si la validación falla
  }