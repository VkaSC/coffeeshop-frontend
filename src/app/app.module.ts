import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RequestComponent } from './pages/request/request.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { MenuProductComponent } from './components/menu-product/menu-product.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RememberComponent } from './pages/remember/remember.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { ActivateComponent } from './pages/activate/activate.component';
import { RevokeComponent } from './pages/revoke/revoke.component';
import { AdminBarComponent } from './components/admin-bar/admin-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TitleComponent,
    MenuComponent,
    RequestComponent,
    ToastsComponent,
    MenuProductComponent,
    OrderProductComponent,
    LoginComponent,
    RememberComponent,
    CredentialsComponent,
    ActivateComponent,
    RevokeComponent,
    AdminBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
