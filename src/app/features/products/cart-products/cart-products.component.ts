import { AfterViewInit, Component, EventEmitter, Output, } from "@angular/core";
import { Product, ProductsService } from "../products.service";
import { take, tap } from "rxjs";
import { SweetAlertService } from "src/libs/services/sweet-alert.service";

@Component({
  selector: "app-cfp-cart-products",
  templateUrl: "./cart-products.component.html",
})
export class CartProductsComponent implements AfterViewInit {
  bestProducts: any[] = [];
  displayedColumns: string[] = ['productName', 'productPrice'];

  @Output() shouldLoading = new EventEmitter<number>();

  constructor(private _productsService: ProductsService,
    private _sweetAlertService: SweetAlertService,
  ) { }

  ngAfterViewInit(): void {
    const TIME_OUT = setTimeout(() => {
      this._getAllProducts();
      clearTimeout(TIME_OUT);
    }, 0);
  }

  private _getAllProducts() {
    this._productsService.getShoppingListFromUser().pipe(
      take(1),
      tap((response: Product[]) => {
        this.bestProducts = response;
        this.shouldLoading.emit(this.bestProducts.length);
      })
    ).subscribe();
  }

  getTotalCost() {
    return this.bestProducts.map(element => element.productPrice)
      .reduce((acc, value) => acc + value, 0);
  }

  removeItemFromList(product: Product) {
    this._sweetAlertService.alert('Are you sure want to remove this item from Shopping Cart?')
      .then((result: any) => {
        if (result.isConfirmed) {
          this._productsService.removeProductFromShoppingCart(product);
          this._sweetAlertService.successToDelete();
          this._getAllProducts();
        }
      });
  }

}
