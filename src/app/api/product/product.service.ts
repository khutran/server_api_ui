import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { catchError, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import Category from '../../models/Category';
import Product from '../../models/Product';
import Inventory from '../../models/Inventory';

@Injectable()
export class ProductService extends ServiceProvider {
  protected url = '/api/v1/products';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'Product');
  }

  getProductLocationBySku(product_skus: String[] = []): Observable<any> {
    let params = { sku: product_skus.join(',') };
    return this.http.get(`${this.apiUrl.getApiUrl(this.url)}/location`, { params }).pipe(
      map(result => (result as any).data.map(item => new Inventory(item))),
      catchError(error => {
        throw error;
      })
    );
  }

  getCategories(id): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id + '/category').pipe(
      tap(results => {
        // console.log(results);
      }),
      map(results => {
        return _.assign(
          {},
          {
            data: (results as any).data.map(item => {
              return new Category(item);
            })
          }
        );
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getItemBySku(sku): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/sku/' + sku).pipe(
      map(result => {
        return new Product((result as any).data);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  changeStatus(id, params): Observable<any> {
    return this.http.put(`${this.apiUrl.getApiUrl(this.url)}/${id}/status`, params).pipe(
      map(result => {
        return new Product((result as any).data);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
