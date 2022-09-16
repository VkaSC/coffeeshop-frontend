import { ModuleWithProviders } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pedido', component: HomeComponent },
    { path: 'carta', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: '*/**', component: HomeComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);