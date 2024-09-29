import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessage, passwordValidator } from '../../core/helpers/validationsForm';
import { ChangePassword } from '../../core/models/change-password/changePassword.interface';
import { ChangePasswordService } from '../../core/services/change-password/change-password.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';
import { SecurityService } from '../../core/services/security-service/security.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  @Output() showError: EventEmitter<any> = new EventEmitter();
  @Output() visible: EventEmitter<any> = new EventEmitter();

  value = ''
  formChangePassword!:FormGroup

  constructor(
    private form: FormBuilder,
    private changePasswordService:ChangePasswordService,
    private authService: AuthenticationService,
    private securityService: SecurityService,
  ){
    this.formChangePassword = this.form.group({
      currentPassword: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20),passwordValidator],
      ],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20),passwordValidator],
      ],
      confirmNewPassword: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20),passwordValidator],
      ],
    });
  }




  isValidField(formControlName: any) {
    return (
      this.formChangePassword.controls[formControlName]?.invalid &&
      this.formChangePassword.controls[formControlName].touched
    );
  }

  errorMessageForm(formControl: string): string {
    return errorMessage(formControl, this.formChangePassword);
  }

  changePassword() {

    const email = localStorage.getItem('email')
    const idUser = localStorage.getItem('idUser')

    const newPassword: string = this.formChangePassword.get('newPassword')?.value ?? '';
    const confirmNewPassword: string = this.formChangePassword.get('confirmNewPassword')?.value ?? '';

    if(newPassword !== confirmNewPassword){
      this.showError.emit('Las contraseñas no coincide')
      return
    }

    const changePassword: ChangePassword = {
      id: Number(idUser?? ''),
      newPassword: String(this.formChangePassword.get('newPassword')?.value ?? ''),
    }

    this.authService
      .login({ email: email?? '', password: this.formChangePassword.get('currentPassword')?.value ?? '' })
      .subscribe({
        next: (value) => {
          this.changePasswordService.changePassword(changePassword).subscribe({
            next: (valueResponse) => {
              Swal.fire({
                title: "¡Operación exitosa!",
                text: "¡Contraseña cambiada con éxito!",
                icon: "success",
                confirmButtonText: 'Aceptar'
              });
              this.visible.emit(false);
              setTimeout(() => {
                this.goOut()
              }, 2000);
            },
            error: (errorResponse) =>{
              Swal.fire({
                title: "¡Ocurrió un error!",
                text: `${errorResponse.error?.message ?? 'Sucedió un error inesperado'}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              this.visible.emit(false);
            }
          })
        },
        error: (errorMessage) => {
          this.showError.emit('Contraseña inválida')
        },
      });
  }

  goOut(){
    this.securityService.LogOff();
  }

}
