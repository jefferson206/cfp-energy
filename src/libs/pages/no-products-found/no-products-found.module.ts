import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoProductsFoundComponent } from './no-products-found.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NoProductsFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
   ],
  exports: [ NoProductsFoundComponent ],
})
export class NoProductsFoundModule { }
