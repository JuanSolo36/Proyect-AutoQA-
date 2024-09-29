import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { SecurityService } from '../../../core/services/security-service/security.service';
import Swal from 'sweetalert2';
import {
  errorMessage,
  passwordValidator,
} from '../../../core/helpers/validationsForm';
import { Rol } from '../../../core/models/roles';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthOtpComponent } from '../auth-otp/auth-otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [DialogService]
})
export class LoginComponent {
  formLogin!: FormGroup;
  ref?: DynamicDialogRef; //Referencia al dialog que se genera al momento de crear o editar un elemento

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private securityService: SecurityService,
    private fb: FormBuilder,
    public dialogService: DialogService
  ) {
    this.formLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          passwordValidator,
        ],
      ],
    });
  }

  onLogin() {
    this.authService
      .login({
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value,
      })
      .subscribe({
        next: (value) => {
          switch (value.user.roleId.id) {
            case Rol.Administrator:
              localStorage.setItem('email', value.user.email);
              localStorage.setItem('idUser', value.user.id.toString());
              this.securityService.SaveUserAndToken(value);
            
          }
          this.showDialogOTP();
          // console.log(value);
          // if (this.router.url == '/auth' && value.user.roleId.id == 12) {
          //   this.router.navigate(['/administrator/users']);
          //   console.log('admin');
          // }
        },
        error: (errorMessage) => {
          Swal.fire({
            title: '¡Error!',
            text: `${
              errorMessage.error.message ?? 'Sucedió un error inesperado'
            }`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  showDialogOTP() {
    this.ref = this.dialogService.open(AuthOtpComponent, {
      header: 'Autenticación',
      width: '80%',
      height:'80%',
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe({
      next: (updateTable) => {},
    });
  }

  navigateToRecoverPassword() {
    this.router.navigate(['/auth/recover-password']);
  }

  isValidField(formControlName: any) {
    return (
      this.formLogin.controls[formControlName].invalid &&
      this.formLogin.controls[formControlName].touched
    );
  }
  errorMessageForm(formControl: string) {
    // válida que el formulario, de lo contrarió muestra error
    return errorMessage(formControl, this.formLogin);
  }
}
