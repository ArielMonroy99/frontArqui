import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './views/inventory/inventory.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterAdminComponent } from './views/register-admin/register-admin.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'registeruser', component: RegisterUserComponent},
  { path: 'registeradmin', component: RegisterAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
