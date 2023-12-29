import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BasicCrudService } from 'src/libs/services/basic-crud-service';
import { API } from 'src/libs/services/constants/api.constants';
import { Product } from 'src/app/features/products/products.service';

export class User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  wishList?: Product[];
  shoppingList?: Product[];
}

@Injectable({ providedIn: 'root' })
export class LoginService extends BasicCrudService<User> {
	constructor(protected override http: HttpClient) {
    super(http, API.ENDPOINT_USERS);
  }

}
