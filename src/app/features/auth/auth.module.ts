import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from '../../core/services/security-service/security.service';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { PrimengModule } from '../../shared/primeng/primeng/primeng.module';
import { RecordComponent } from './record/record.component';
import { RecoveryPasswordService } from '../../core/services/recoveryPassword/recovery-password.service';
import { ChangePasswordService } from '../../core/services/change-password/change-password.service';
import { AuthOtpComponent } from './auth-otp/auth-otp.component';
import { LoadingModule } from "../../components/loading/loading.module";



@NgModule({
  declarations: [
    LoginComponent,
    RecordComponent,
    AuthOtpComponent
  ],
  providers: [
    SecurityService,
    MessageService,
    AuthenticationService,
    RecoveryPasswordService,
    ChangePasswordService,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    HttpClientModule,
    LoadingModule
]
})
export class AuthModule { }
