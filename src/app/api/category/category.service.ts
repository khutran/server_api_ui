import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Category from '../../models/Category';
import * as _ from 'lodash';

@Injectable()
export class CategoryService extends ServiceProvider {
  protected url = '/api/v1/categories';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'Category');
  }

  getNestedCategory(categoryId = 0): Observable<any> {
    return this.http.get(`${this.apiUrl.getApiUrl(this.url)}/${categoryId}/path`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  all(params = {}): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/all').pipe(
      map(result => {
        return _.map((result as any).data, item => new Category(item));
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  allWithExtras(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      map(result => {
        return _.map((result as any).data, item => new Category(item));
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
