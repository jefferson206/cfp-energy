import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from './carousel.component';

@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ CarouselComponent ],
  bootstrap: [ CarouselComponent ],
  providers: [],
})
export class CarouselModule { }
