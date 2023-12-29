import { tap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, } from "@angular/core";
import { Product, ProductsService } from "../products.service";
import { SweetAlertService } from 'src/libs/services/sweet-alert.service';

@Component({
  selector: "app-cfp-best-products",
  templateUrl: "./best-products.component.html",
})
export class BestProductsComponent implements AfterViewInit, OnDestroy {
  private readonly _COMPONENT_DESTROY$ = new Subject<any>();

  bestProducts: Product[] = [];

  @Output() shouldLoading = new EventEmitter<number>();

  constructor(private _productsService: ProductsService,
    private _sweetAlertService: SweetAlertService,
    ) { }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.complete();
  }

  ngAfterViewInit(): void {
    const TIME_OUT = setTimeout(() => {
      this._getToppingFiveProducts();
      clearTimeout(TIME_OUT);
    }, 0);
  }

  private _getToppingFiveProducts(): void {
    this._productsService.getAll().pipe(
      takeUntil(this._COMPONENT_DESTROY$),
      map((response: any[]) => response.slice(0, 5)),
      tap((response: any[]) => {
        this.bestProducts = response;
        this.shouldLoading.emit(this.bestProducts.length);
      })
    ).subscribe();
  }

  addItemToWishList(product: Product) {
    this._productsService.addItemToWishList(product);
    this._sweetAlertService.success('Item add to Wish List');
  }

  addItemToShoppingCart(product: Product) {
    this._productsService.addItemToShoppingCart(product);
    this._sweetAlertService.success('Item add to Shopping Cart.');
  }
}
