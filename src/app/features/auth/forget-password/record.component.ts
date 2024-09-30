import { Component, OnInit } from '@angular/core';
import { MenuItem,MessageService  } from 'primeng/api';
import { RecoveryPassword } from '../../../core/models/recoveryPassword/recoveryPassword.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { SecurityService } from '../../../core/services/security-service/security.service';
import { ChangesPassword } from '../../../core/models/recoveryPassword/changesPassword.interface';
import { ChangePasswordService } from '../../../core/services/change-password/change-password.service';
import { Router } from '@angular/router';
import { ChangePassword } from '../../../core/models/change-password/changePassword.interface';
import { RecoveryPasswordService }  from '../../../core/services/recoveryPassword/recovery-password.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent implements OnInit {
  email: string = ''
  password: string = ''
  idUser: string = ''
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  formPaswords!: FormGroup;

    constructor(
      public messageService: MessageService,
      private form: FormBuilder,
      private recoveryPasswordService: RecoveryPasswordService,
      private authService: AuthenticationService,
      private changesPasswordService: ChangePasswordService,
      private securityService: SecurityService,
      private router: Router,

      ) {
        this.formPaswords = this.form.group(
          {
            newPassword: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
          }
        );
      }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    ngOnInit() {
      this.items = [
          {
              label: 'Paso 1',
              command: (event: any) => {
                this.activeIndex = 0
                this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})},
          },
          {
              label: 'Paso 2',
              command: (event: any) => {
                this.activeIndex = 1
                this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})}
          },
          {
              label: 'Paso 3',
              command: (event: any) => {
                this.activeIndex = 2
                this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
              }
          }
      ];
  }
  changeStep(index: number){
    if(index >= 0 && index < this.items!!.length){
      this.activeIndex =  index
    }
  }

  recoveryPasswordUser(){
    this.formPaswords.get('newPassword')?.value?? ''

    if(!this.email || this.email.trim()===""){
      Swal.fire({
        title: "¡Error en el formulario!",
        text: "El texto no puede ir vacío",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.recoveryPasswordService.recoveryPasswordUser(this.email).subscribe({
        next: () => {
        Swal.fire({
          title: "¡Operación exitosa!",
          text: "¡Código enviado con éxito!",
          icon: "success",
          confirmButtonText: 'Aceptar'

        });
        this.activeIndex = 1
      },
      error: (response) =>{
        Swal.fire({
          title: "¡Ocurrió un error!",
          text: `${response.error?.message ?? 'Sucedió un error inesperado'}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    })


  }

  onLogin() {
    if(!this.password || this.password.trim()===""){
      Swal.fire({
        title: "¡Error en el formulario!",
        text: "El codigo no puede ir vacío",
        icon: 'error',
        confirmButtonText: 'Aceptar'

      });
      return
    }
    this.authService.loginPasword({ email: this.email, password: this.password })

      .subscribe({
        next: (value) => {
          Swal.fire({
            title: "¡Operación exitosa!",
            text: "¡Código valido!",
            icon: "success",
            confirmButtonText: 'Aceptar'

          });
          this.securityService.SaveUserAndToken(value);
          this.activeIndex = 2
          this.idUser = value.user.id
        },
        error: (response) => {
          Swal.fire({
            title: "¡Ocurrió un error!",
            text: `${response.error?.message ?? 'Sucedió un error inesperado'}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
      });
  }
  changesPassword(){
    const email = this.email
    const newPassword = this.formPaswords.get('newPassword')?.value ?? '';
    const confirmPassword = this.formPaswords.get('confirmPassword')?.value ?? '';

  // Verificación para las contraseñas
    if (!this.password || this.password.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "") {
      Swal.fire({
        title: "¡Error en el formulario!",
        text: "Las contraseñas no pueden estar vacías",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return; // Detiene la ejecución si alguna de las contraseñas está vacía
    }

    if(newPassword !== confirmPassword){
      Swal.fire({
        title: "¡Error en el formulario!",
        text: "Las contraseñas no coinciden",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return
    }

    const changesPasswordRequest: ChangePassword = {
      id: Number(this.idUser),
      newPassword: this.formPaswords.get('newPassword')?.value?? '',
    };


    this.authService
      .login({ email: email?? '', password: this.password})
      .subscribe({
        next: (value) => {
          this.securityService.SaveUserAndToken(value);
          this.changesPasswordService.changePassword(changesPasswordRequest).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Operación exitosa!",
              text: "¡Cambio de contraseña exitoso!",
              icon: "success",
              confirmButtonText: 'Aceptar'

            });
            this.router.navigate(['/auth']);
          },
          error: (errorResponse:any) =>{
            Swal.fire({
              title: "¡Ocurrió un error!",
              text: `${errorResponse.error?.message ?? 'Sucedió un error inesperado'}`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        })
      },
      error: (errorMessage) => {
        Swal.fire({
          title: "¡Ocurrió un error!",
          text: `Contraseña invalida`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }
}
