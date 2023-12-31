import { NgModule } from '@angular/core';
import { OurProductsComponent } from './our-products/our-products.component';
import { BestProductsComponent } from './best-products/best-products.component';
import { ProductsRouting } from './products-routing.module';
import { CardItemModule } from 'src/libs/components/card-item/card-item.module';
import { MatSelectModule } from '@angular/material/select';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { MatTableModule } from '@angular/material/table';
import { NoProductsFoundModule } from 'src/libs/pages/no-products-found/no-products-found.module';
import { SharedLibsModule } from 'src/libs/utils/shared-libs.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudProductsComponent } from './crud-products/crud-products.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    OurProductsComponent,
    BestProductsComponent,
    WishListComponent,
    CartProductsComponent,
    ProductDetailComponent,
    CrudProductsComponent
  ],
  imports: [
    SharedLibsModule,
    MatTableModule,
    MatSelectModule,
    NoProductsFoundModule,
    CardItemModule,
    ProductsRouting,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    OurProductsComponent,
    BestProductsComponent,
    WishListComponent,
    CartProductsComponent,
    ProductDetailComponent,
    CrudProductsComponent
  ]
})
export class ProductsModule { }
