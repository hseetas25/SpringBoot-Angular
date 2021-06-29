import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddNewProductComponent,
  ProductListComponent,
  PageNotFoundComponent,
  UpdateProductComponent
} from './components';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
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
  ]
}
