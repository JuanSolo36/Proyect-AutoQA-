import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthOtpComponent } from './auth-otp/auth-otp.component';
import { RecordComponent } from './record/record.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'record', component: RecordComponent },
  { path: 'otp', component: AuthOtpComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
