import { Component } from "@angular/core";

@Component({
  selector: "app-cfp-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  loading: boolean = true;

  constructor() { }

  getHowManyProducts($event: number) {
    this.loading =  $event === 0 ? true : false;
  }
}
