import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { RegisterAdminComponent } from './views/register-admin/register-admin.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { ShopComponent } from './views/shop/shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressComponent } from './views/address/address.component';
import { OrderComponent } from './views/order/order.component';
import { VetComponent } from './views/vet/vet.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { ReportsComponent } from './views/reports/reports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyAppointmentsComponent } from './views/my-appointments/my-appointments.component';
import { OrdersComponent } from './views/orders/orders.component';
import { HomeComponent } from './views/home/home.component';
import { initializeKeycloak } from './utils/app.util';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppAuthGuard } from './guard/app.auth.guard';
import { ErrorComponent } from './views/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterAdminComponent,
    InventoryComponent,
    NavbarComponent,
    ShopComponent,
    AddressComponent,
    OrderComponent,
    VetComponent,
    AppointmentComponent,
    ReportsComponent,
    MyAppointmentsComponent,
    OrdersComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AppAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
