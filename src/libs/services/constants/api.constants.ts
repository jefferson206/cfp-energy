import { environment } from "src/environments/environment";

export class API {
  static readonly GATEWAY_URL = environment.apiGateway;

  static readonly ENDPOINT_USERS = `${API.GATEWAY_URL}/users`;
  static readonly ENDPOINT_PRODUCTS = `${API.GATEWAY_URL}/products`;

}
