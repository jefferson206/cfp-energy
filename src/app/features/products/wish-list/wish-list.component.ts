import { AfterViewInit, Component, EventEmitter, Output, } from "@angular/core";
import { Product, ProductsService } from "../products.service";
import { take, tap } from "rxjs";
import { SweetAlertService } from "src/libs/services/sweet-alert.service";

@Component({
  selector: "app-cfp-wish-list",
  templateUrl: "./wish-list.component.html",
})
export class WishListComponent implements AfterViewInit {
  bestProducts: any[] = [];

  @Output() shouldLoading = new EventEmitter<number>();

  constructor(private _productsService: ProductsService,
    private _sweetAlertService: SweetAlertService
  ) { }

  ngAfterViewInit(): void {
    const TIME_OUT = setTimeout(() => {
      this._getAllProducts();
      clearTimeout(TIME_OUT);
    }, 0);
  }

  removeItemFromList(product: Product) {
    this._sweetAlertService.alert('Are you sure want to remove this item from Wish List?')
      .then((result: any) => {
        if (result.isConfirmed) {
          this._productsService.removeProductFromWishList(product);
          this._sweetAlertService.successToDelete();
          this._getAllProducts();
        }
      });
  }

  private _getAllProducts() {
    this._productsService.getWishListFromUser().pipe(
      take(1),
      tap((response: Product[]) => {
        this.bestProducts = response;
        this.shouldLoading.emit(this.bestProducts.length);
      })
    ).subscribe();
    return this.bestProducts;
  }
}
