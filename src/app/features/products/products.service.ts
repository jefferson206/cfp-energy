import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BasicCrudService } from 'src/libs/services/basic-crud-service';
import { API } from 'src/libs/services/constants/api.constants';
import { LoginService, User } from 'src/app/core/login/login.service';
import { Observable, filter, map, mergeMap, take, tap, toArray } from 'rxjs';

export class Product {
  id?: number;
  productImageUrl?: string;
  productCategory?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  stock?: number;
  lastUpdate?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService extends BasicCrudService<Product> {
	constructor(protected override http: HttpClient) {
    super(http, API.ENDPOINT_PRODUCTS);
  }

  getWishListFromUser(): Observable<Product[]> {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    return this.http.get<Product[]>(API.ENDPOINT_PRODUCTS, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        }),
        map((response: any) => {
          return response.filter((wish: any) => {
            return TOKEN.wishList?.find((element: any) => {
              if (wish.id === element) return wish;
            });
          });
        })
      );
  }

  getShoppingListFromUser(): Observable<Product[]> {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    return this.http.get<Product[]>(API.ENDPOINT_PRODUCTS, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        }),
        map((response: any) => {
          return response.filter((shoppingCart: any) => {
            return TOKEN.shoppingList?.find((element: any) => {
              if (shoppingCart.id === element) return shoppingCart;
            });
          });
        })
      );
  }

  removeProductFromWishList(product: any) {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    const index: any = TOKEN.wishList?.indexOf(product.id);
    if (index !== -1) {
      TOKEN.wishList?.splice(index, 1);
      this._updateToken(TOKEN);
    }
  }

  addItemToWishList(product: any) {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    TOKEN.wishList?.push(product.id);
    this._updateToken(TOKEN);
  }

  addItemToShoppingCart(product: any) {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    TOKEN.shoppingList?.push(product.id);
    this._updateToken(TOKEN);
  }

  removeProductFromShoppingCart(product: any) {
    const TOKEN: User = JSON.parse(String(localStorage.getItem('token')));
    const index: any = TOKEN.shoppingList?.indexOf(product.id);
    if (index !== -1) {
      TOKEN.shoppingList?.splice(index, 1);
      this._updateToken(TOKEN);
    }
  }

  private _updateToken(TOKEN: any) {
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(TOKEN));
  }

}
