import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../shared/primeng/primeng/primeng.module';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersComponent } from './users/users.component';
import { UserService } from '../../core/services/administrator/user.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuProductsService } from '../../core/services/menu-products/menu-products.service';
import { LoadingModule } from '../../components/loading/loading.module';
import { FormatDatePipe } from '../../core/helpers/FormatDatePipe';
import { FormatsPipeModule } from '../../core/helpers/FormatsPipe.module';
import { AdminComponent } from './admin.component';
import { TableComponent } from '../../components/table/table.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { StatuRequisitionsComponent } from './statuRequisitions/statuRequisitions.component';
import { SettingsComponent } from './settings/settings.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { CustomerComponent } from './clients/customer.component';
import { FormCustomerComponent } from './clients/form/form-customer/form-customer.component';



@NgModule({
  declarations: [
    AdminComponent,
    TableComponent,
    UsersComponent,
    FormUserComponent,
    CustomerComponent,
    QuotationsComponent,
    StatuRequisitionsComponent,
    SettingsComponent,
    FormCustomerComponent
  ],
  providers: [
    AuthenticationService,
    MessageService,
    UserService,
    ConfirmationService,
    DialogService,
    MenuProductsService
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    LoadingModule,
    FormatsPipeModule,
    // BrowserAnimationsModule
  ],
})
export class AdminModule { }
