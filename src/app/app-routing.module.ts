import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from 'src/libs/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from 'src/libs/resolvers/auth.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      {
        path: "products",
        loadChildren: () =>
          import("./features/products/products.module").then(
            (m) => m.ProductsModule
          ),
      },

    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
