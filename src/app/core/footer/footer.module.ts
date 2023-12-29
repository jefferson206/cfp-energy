import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ FooterComponent ]
})
export class FooterModule { }
