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
import { HistoricOrderComponent } from './components/historic-order/historic-order.component';
import { MillisToEsDatePipe } from './pipes/millis-to-es-date.pipe';
import { ProductsComponent } from './pages/products/products.component';
import { AllergensComponent } from './pages/allergens/allergens.component';
import { UsersComponent } from './pages/users/users.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AllergenModalComponent } from './components/allergen-modal/allergen-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { BoolValuePipe } from './pipes/bool-value.pipe';
import { FirstLetterCapPipe } from './pipes/first-letter-cap.pipe';
import { AllergenRefComponent } from './components/allergen-ref/allergen-ref.component';
import { AllergenListItemComponent } from './components/allergen-list-item/allergen-list-item.component';

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
    AdminBarComponent,
    HistoricOrderComponent,
    MillisToEsDatePipe,
    ProductsComponent,
    AllergensComponent,
    UsersComponent,
    ModalComponent,
    ProductModalComponent,
    AlertModalComponent,
    AllergenModalComponent,
    OrdersComponent,
    UserModalComponent,
    BoolValuePipe,
    FirstLetterCapPipe,
    AllergenRefComponent,
    AllergenListItemComponent
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
