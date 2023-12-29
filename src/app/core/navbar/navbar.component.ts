import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cfp-navbar",
  templateUrl: "./navbar.component.html",
  styles: [`
    .menu-btn:hover {
      color: aquamarine;
      transform: scale(1.3);
      transition: all .3s ease-in-out;
    }
  `],
})
export class NavbarComponent {
  constructor(private router: Router) { }

  navigateTo(route: any): void {
    this.router.navigate([`./${route}`]);
  }

  getTokenAdmin() {
    const TOKEN = JSON.parse(String(localStorage.getItem('token')));
    return TOKEN?.isAdmin ?? false;
  }
}
