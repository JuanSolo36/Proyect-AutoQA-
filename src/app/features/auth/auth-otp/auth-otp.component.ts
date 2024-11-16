import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/services/security-service/security.service';
import { User } from '../../../core/models/user/loginUserResponse';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showMessage, TypeMessage } from '../../../core/models/message';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-auth-otp',
  standalone: false,
  templateUrl: './auth-otp.component.html',
  styleUrl: './auth-otp.component.css',
  providers: [MessageService]
})
export class AuthOtpComponent implements OnInit {
  userAdmin?: User;
  codeForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  async ngOnInit() {
    this.userAdmin = await this.securityService.GetDataUser();
  }

  onAuthOTP() {
    console.log("valor del dato", this.userAdmin)
    if (this.codeForm.valid) {
      this.authenticationService
        .authOTP({
          email: this.userAdmin?.email ?? '',
          totpCode: this.codeForm.get('code')!.value,
        })
        .subscribe({
          next: (value) => {
            this.isLoading = false;
            this.securityService.setAuthorized();

            showMessage(
              TypeMessage.success,
              'Éxito',
              `${'¡Código correcto!'}`,
              this.messageService
            );
            this.ref.close(true);

          this.router.navigate(['/administrator/users']);

          },
          error: (error) => {
            this.isLoading = false;
            showMessage(
              TypeMessage.error,
              'Error',
              `${'Código incorrecto, verifiqué e intente nuevamente'}`,
              this.messageService
            );
          },
        });
    }
  }
  onRecoverOPT() {
    this.authenticationService
      .recoveryCodeOTP(this.userAdmin?.email ?? '')
      .subscribe({
        next: (value) => {
          this.isLoading = false;
          showMessage(
            TypeMessage.success,
            'Éxito',
            `${'Se ha enviado el correo electrónico, para recuperar el código OPT!'}`,
            this.messageService
          );
        },
        error: (error) => {
          this.isLoading = false;
          showMessage(
            TypeMessage.error,
            'Error',
            `${'No se ha enviado el correo electrónico'}`,
            this.messageService
          );
        },
      });
  }
}
