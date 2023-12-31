import { Component, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";

import { SweetAlertService } from "src/libs/services/sweet-alert.service";
import { Product, ProductsService } from "../products.service";

@Component({
  selector: "app-cfp-our-products",
  templateUrl: "./our-products.component.html",
})
export class OurProductsComponent implements OnInit {
  bestProducts: Product[] = [];
  firstBestProducts: Product[] = this.bestProducts;
  brands = ["All"];

  private readonly _COMPONENT_DESTROY$ = new Subject<any>();

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.complete();
  }

  constructor(private _productsService: ProductsService,
    private _sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  onChooseBrand(brand: any): void {
    this.bestProducts = this.firstBestProducts;
    if (brand === 'All') return;
    this.bestProducts = this.bestProducts.filter(product => product.productCategory === brand);
  }

  getAllProducts(): void {
    this._productsService.getAll().pipe(
      takeUntil(this._COMPONENT_DESTROY$),
      tap((response: Product[]) => {
        this.bestProducts = response;
        this.firstBestProducts = response;
        this._createSelectFilter(response);
      })
    ).subscribe();
  }

  private _createSelectFilter(products: Product[]): void {
    this.brands.push(...products.map(product => String(product.productCategory)));
    this.brands = this.brands.filter((value, index) => this.brands.indexOf(value) === index);
  }

  addItemToWishList(product: Product): void {
    this._productsService.addItemToWishList(product);
    this._sweetAlertService.success('Item add to Wish List');
  }

  addItemToShoppingCart(product: Product): void {
    this._productsService.addItemToShoppingCart(product);
    this._sweetAlertService.success('Item add to Shopping Cart.');
  }
}
