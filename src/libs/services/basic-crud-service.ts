import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export class BasicCrudService<T> {
  constructor(protected http: HttpClient, protected resourceUrl: any) {}

  created(object: T): Observable<T> {
    return this.http.post<T>(this.resourceUrl, object, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        })
      );
  }

  update(object: T | any): Observable<T> {
    return this.http.put<T>(`${this.resourceUrl}`, object, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        })
      );
  }

  updateById(object: T | any): Observable<T> {
    return this.http.put<T>(`${this.resourceUrl}/${object.id}`, object, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        })
      );
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        })
      );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourceUrl, { observe: 'response' })
      .pipe(
        filter((response: any) => response?.ok),
        map((response: any) => response?.body),
        map((bodyResponse: any) => {
          return this._checkBodyResponse(bodyResponse);
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected _checkBodyResponse(bodyResponse: any) {
    if (bodyResponse.data != null) {
      return bodyResponse.data;
    } else {
      return bodyResponse;
    }
  }
}
