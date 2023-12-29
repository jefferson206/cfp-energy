import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './core/navbar/navbar.module';
import { HomeModule } from './features/home/home.module';
import { FooterModule } from './core/footer/footer.module';
import { ProductsModule } from './features/products/products.module';
import { PageNotFoundModule } from 'src/libs/pages/page-not-found/page-not-found.module';
import { LoginModule } from './core/login/login.module';
import { SharedLibsModule } from 'src/libs/utils/shared-libs.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    SharedLibsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavBarModule,
    FooterModule,
    ProductsModule,
    LoginModule,
    PageNotFoundModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
