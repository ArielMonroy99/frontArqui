import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './views/inventory/inventory.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterAdminComponent } from './views/register-admin/register-admin.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { ShopComponent } from './views/shop/shop.component';
import { AddressComponent } from './views/address/address.component';
import { OrderComponent } from './views/order/order.component';
import { VetComponent } from './views/vet/vet.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { ReportsComponent } from './views/reports/reports.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'registeruser', component: RegisterUserComponent},
  { path: 'registeradmin', component: RegisterAdminComponent},
  { path: 'shop', component: ShopComponent} ,
  { path: 'address', component: AddressComponent},
  { path: 'order', component: OrderComponent},
  { path: 'vet', component: VetComponent},
  { path: 'appointment', component: AppointmentComponent},
  { path: 'reports', component: ReportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
