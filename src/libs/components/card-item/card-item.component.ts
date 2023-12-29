import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/features/products/products.service";

@Component({
  selector: "app-cfp-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"],
})
export class CardItemComponent {
  @Input() bestProducts: Product[] = [];
  @Input() viewDetais = false;
  @Input() removeItem = false;
  @Input() wishList = false;
  @Input() shoppingList = false;

  @Output() shouldRemoveItem = new EventEmitter<Product>();
  @Output() shouldAddToWishList = new EventEmitter<Product>();
  @Output() shouldAddToShoppingCart = new EventEmitter<Product>();

  constructor() {}

  removeItemFromList(product: Product) {
    this.shouldRemoveItem.emit(product);
  }

  addToWishList(product: Product) {
    this.shouldAddToWishList.emit(product);
  }

  addToShoppingCart(product: Product) {
    this.shouldAddToShoppingCart.emit(product);
  }

}
