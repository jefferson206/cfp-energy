import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { filter, mergeMap, take, takeUntil, toArray } from "rxjs/operators";
import { Subject, tap } from "rxjs";

import { SweetAlertService } from "src/libs/services/sweet-alert.service";
import { Product, ProductsService } from "../products.service";

@Component({
  selector: "app-cfp-crud-products",
  templateUrl: "./crud-products.component.html",
})
export class CrudProductsComponent implements OnInit, OnDestroy {
  private readonly _COMPONENT_DESTROY$ = new Subject<any>();
  bestProducts: any[] = [];
  displayedColumns: string[] = ['id', 'productName', 'productCategory', 'productPrice', 'stock', 'lastUpdate'];

	form: FormGroup = this._formBuilder.group({
    id: null,
    productImageUrl: [null],
    productCategory: [null, Validators.required],
    productName: [null, Validators.required],
    productDescription: [null, Validators.required],
    productPrice: [null, Validators.required],
    stock: [null, Validators.required],
    lastUpdate: [Date.now()]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _sweetAlertService: SweetAlertService,
    private _productsService: ProductsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._getAllProducts();

  }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.complete();
  }

  private _getAllProducts(): void {
    this._productsService.getAll().pipe(
      takeUntil(this._COMPONENT_DESTROY$),
      tap((response: Product[]) => {
        this.bestProducts = response;
      })
    ).subscribe();
  }


  getFormControl(field: string): FormControl {
		return this.form.controls[field] as FormControl;
	}

  createProduct(): void  {
    this._setDateAtLastUpdate();
    if (this.form.invalid) return;
    this._productsService.created(this.form.getRawValue())
      .pipe(
        takeUntil(this._COMPONENT_DESTROY$),
        tap(() => {
          this._sweetAlertService.success('Product created.');
          this._getAllProducts();
          this.clearForm();
        })
      ).subscribe();
  }

  updateProduct(): void  {
    this._setDateAtLastUpdate();
    this.form.patchValue({ productPrice: this.form.getRawValue().productPrice });
    if (this.form.invalid) return;
    this._productsService.updateById(this.form.getRawValue())
      .pipe(
        takeUntil(this._COMPONENT_DESTROY$),
        tap(() => {
          this._sweetAlertService.success('Product updated.');
          this._getAllProducts();
          this.clearForm();
        })
      ).subscribe();
  }

  deleteProduct(): void {
    this._sweetAlertService.alert('Are you sure want to remove this product?')
      .then((response: any) => {
        if (response.isConfirmed) {
          this._productsService.delete(this.form.getRawValue().id)
            .pipe(
              take(1),
              tap(() => {
                this._sweetAlertService.successToDelete();
                this._getAllProducts();
                this.clearForm();
              })
            ).subscribe();
        }
      });
  }

  getRecord(row: Product) {
    this.form.setValue(row);
  }

  clearForm() {
    this.form.reset();
    this._setDateAtLastUpdate();
  }

  private _setDateAtLastUpdate() {
    this.form.patchValue({ lastUpdate: Date.now() });
  }
}
