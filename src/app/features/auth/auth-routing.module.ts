import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthOtpComponent } from './auth-otp/auth-otp.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recover-password', component: ForgetPasswordComponent },
  { path: 'otp', component: AuthOtpComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
