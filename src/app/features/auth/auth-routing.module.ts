import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecordComponent } from './forget-password/record.component';
import { AuthOtpComponent } from './auth-otp/auth-otp.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recover-password', component: RecordComponent },
  { path: 'otp', component: AuthOtpComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
