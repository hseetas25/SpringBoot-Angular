import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddNewProductComponent,
  ProductListComponent,
  PageNotFoundComponent,
  UpdateProductComponent,
  AdminLoginComponent
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'add-product', component: AddNewProductComponent},
  { path: 'products/update-product/:id', component: UpdateProductComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components =[
    ProductListComponent,
    AddNewProductComponent,
    UpdateProductComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
  ]
}
