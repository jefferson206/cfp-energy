import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { NewAccountComponent } from './new-account/new-account.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedLibsModule } from 'src/libs/utils/shared-libs.module';

@NgModule({
  declarations: [
    LoginComponent,
    NewAccountComponent
  ],
  imports: [
    SharedLibsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  exports: [ LoginComponent ],
  providers: [],
})
export class LoginModule { }
