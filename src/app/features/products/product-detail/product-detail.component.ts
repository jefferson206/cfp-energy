import { Component, EventEmitter, OnDestroy, OnInit, Output, } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take, tap, Subject } from 'rxjs';

import { SweetAlertService } from 'src/libs/services/sweet-alert.service';
import { Product, ProductsService } from "../products.service";

@Component({
  selector: "app-cfp-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private readonly _COMPONENT_DESTROY$ = new Subject<any>();

  willBeAvailable = new Date();
  product: Product = new Product();
  bestProducts: Product[] = [];
  labelStock: any = { label: '', colour: '' };

  @Output() shouldLoading = new EventEmitter<number>();

  constructor(private _productsService: ProductsService,
    private _sweetAlertService: SweetAlertService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.complete();
  }

  private _addSevenDaysAtAvailabeDate() {
    this.willBeAvailable.setDate(this.willBeAvailable.getDate() + 7 );
  }

  ngOnInit(): void {
    this._addSevenDaysAtAvailabeDate();
    this.route.params.subscribe((params: any) => this._getProductById(params.id));
  }

  private _getProductById(id: number) {
    this._productsService.getById(id).pipe(
      take(1),
      tap((response: Product) => {
        this.product = response;
        this.bestProducts.push(response);
      })
    ).subscribe();
  }

  addItemToWishList(product: any) {
    this._productsService.addItemToWishList(product);
    this._sweetAlertService.success('Item add to Wish List');
  }

  addItemToShoppingCart(product: any) {
    this._productsService.addItemToShoppingCart(product);
    this._sweetAlertService.success('Item add to Shopping Cart.');
  }

  checkStock() {
    if (Number(this.product.stock) > 0 && Number(this.product.stock) < 4) {
      this.labelStock.label = 'Low stock';
      this.labelStock.colour = 'rgb(184, 16, 16)';
      return true;
    }
    if (Number(this.product.stock) >= 4 && Number(this.product.stock) < 8) {
      this.labelStock.label = 'Regular stock';
      this.labelStock.colour = 'rgb(186, 230, 26)';
      return true;
    }
    return false;
  }
}
