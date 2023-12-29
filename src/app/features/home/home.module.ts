import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'src/libs/components/carousel/carousel.module';
import { SkeletonModule } from 'src/libs/components/skeleton/skeleton.module';
import { ProductsModule } from '../products/products.module';
import { SharedLibsModule } from 'src/libs/utils/shared-libs.module';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    SharedLibsModule,
    ProductsModule,
    CarouselModule,
    SkeletonModule,
    MatButtonModule,
  ],
  exports: [ HomeComponent ],
})
export class HomeModule { }
