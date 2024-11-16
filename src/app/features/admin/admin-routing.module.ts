import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { CustomerComponent } from './clients/customer.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { StatuRequisitionsComponent } from './statuRequisitions/statuRequisitions.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: '', component: AdminComponent, 
  children:[
    { path: 'users', component: UsersComponent },
    { path: 'clients', component: CustomerComponent },

    { path: 'quotations', component: QuotationsComponent },
    { path: 'requisitions', component: RequisitionsComponent },

    { path: 'statuRequisitions', component: StatuRequisitionsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**',redirectTo:'users'}
  ]},
  // { path: 'ope/inventory', component: InventoryProductsComponent },
  // { path: 'ope/product/:id', component: ProductDetailComponent , canActivate: [uriDecoderGuard]},
  // { path: '**',redirectTo:'suppliers'}
  
  // definir ruta aqui y crear primero el componente en el mismo rango de la ruta
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
