import { ModuleWithProviders } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { ActivateComponent } from "./pages/activate/activate.component";
import { AllergensComponent } from "./pages/allergens/allergens.component";
import { CredentialsComponent } from "./pages/credentials/credentials.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MenuComponent } from "./pages/menu/menu.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProductsComponent } from "./pages/products/products.component";
import { RememberComponent } from "./pages/remember/remember.component";
import { RequestComponent } from "./pages/request/request.component";
import { RevokeComponent } from "./pages/revoke/revoke.component";
import { UsersComponent } from "./pages/users/users.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pedido', component: RequestComponent },
    { path: 'pedidos', component: OrdersComponent },
    { path: 'carta', component: MenuComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recordar', component: RememberComponent },
    { path: 'credenciales/:token', component: CredentialsComponent },
    { path: 'credenciales/crear/:token', component: CredentialsComponent },
    { path: 'activar/:token', component: ActivateComponent },
    { path: 'revocar/:token', component: RevokeComponent },
    { path: 'productos', component: ProductsComponent },
    { path: 'alergenos', component: AllergensComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: '*/**', component: HomeComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);