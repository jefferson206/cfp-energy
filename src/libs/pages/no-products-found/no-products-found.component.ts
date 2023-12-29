import { Component, Input } from "@angular/core";

@Component({
  selector: "app-cfp-no-products-found",
  templateUrl: "./no-products-found.component.html",
  styleUrls: ["./no-products-found.component.scss"],
})
export class NoProductsFoundComponent {
  @Input() title: string = 'No Products Found';
  @Input() description: string = '';

  constructor() {}

}
