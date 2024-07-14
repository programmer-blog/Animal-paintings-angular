import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CarViewComponent } from './cart/car-view/car-view.component';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductListComponent},
    {path: 'cart', component: CarViewComponent},
];
