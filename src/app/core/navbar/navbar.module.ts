import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar.component';
import { SharedLibsModule } from 'src/libs/utils/shared-libs.module';

@NgModule({
  declarations: [ NavbarComponent ],
  imports: [
    SharedLibsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ NavbarComponent ],
})
export class NavBarModule { }
