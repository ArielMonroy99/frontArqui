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
import { MyAppointmentsComponent } from './views/my-appointments/my-appointments.component';
import { OrdersComponent } from './views/orders/orders.component';
import { HomeComponent } from './views/home/home.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'registeruser',
    component: RegisterUserComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'registeradmin',
    component: RegisterAdminComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: 'shop', component: ShopComponent },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'vet',
    component: VetComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  {
    path: 'order-list',
    component: OrdersComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
