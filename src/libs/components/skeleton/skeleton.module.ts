import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [ SkeletonComponent ],
})
export class SkeletonModule { }
