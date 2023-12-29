import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurProductsComponent } from './our-products/our-products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CrudProductsComponent } from './crud-products/crud-products.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: OurProductsComponent,
      },
      {
        path: "wish-list",
        component: WishListComponent,
      },
      {
        path: "crud-products",
        component: CrudProductsComponent,
      },
      {
        path: "shopping",
        component: CartProductsComponent,
      },
      {
        path: "product/:id",
        component: ProductDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(PRODUCT_ROUTES) ],
  exports: [ RouterModule ]
})
export class ProductsRouting { }
