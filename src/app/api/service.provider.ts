import { Injectable } from '@angular/core';
import { ApiUrl } from './api-url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import ProcessType from '../models/ProcessType';
import ProcessStatus from '../models/ProcessStatus';
import Category from '../models/Category';
import ProcessTransition from '../models/ProcessTransition';
import Customer from '../models/Customer';
import Size from '../models/Size';
import Style from '../models/Style';
import Status from '../models/Status';
import Designer from '../models/Designer';
import Order from '../models/Order';
import Inventory from '../models/Inventory';
import Destination from '../models/Destination';
import Location from '../models/Location';
import DestinationType from '../models/DestinationType';
import Event from './../models/Event';
import CustomerAddress from '../models/CustomerAddress';
import Product from '../models/Product';
import LengthAwarePaginator from '../models/LengthAwarePaginator';
import Track from '../models/Track';
import Currency from '../models/Currency';
import Courier from '../models/Courier';
import Role from '../models/Role';
import User from '../models/User';
import Constant from '../models/Constant';
import Provider from '../models/Provider';
import Media from '../models/Media';
import { AppInjector } from '../app-injector';
import { PreloaderService } from '../common/services/preloader/preloader.service';
import CustomerGroup from './../models/CustomerGroup';

const classes = {
  ProcessType,
  ProcessStatus,
  Category,
  ProcessTransition,
  Customer,
  Size,
  Style,
  Status,
  Designer,
  Order,
  Inventory,
  Destination,
  Location,
  DestinationType,
  Event,
  CustomerAddress,
  Product,
  Track,
  Role,
  Constant,
  Provider,
  User,
  CustomerGroup,
  Currency,
  Courier,
  Media
};

export class ServiceProvider {
  protected url = '';

  constructor(protected http: HttpClient, protected apiUrl: ApiUrl, public modelName = '') {}
  /**
   * Get list of all resource with pagination
   *
   * @param param Optinal
   * @param sort Optinal
   * @param filter Optinal
   * @param search Optinal
   *
   * @return Observable
   */
  get(param: object = { page: 1, per_page: 100 }, sort: any = null, filter: any = null, search: any = null): Observable<any> {
    let query = [];
    let sorts = [];
    // tslint:disable-next-line:forin
    for (const prop in param) {
      query.push(prop + '=' + param[prop]);
    }
    if (sort) {
      for (const prop in sort) {
        if (sort[prop] !== null) {
          sorts.push(sort[prop] + prop);
        }
      }
    }
    AppInjector.get(PreloaderService).show();
    return this.http
      .get(
        this.apiUrl.getApiUrl(this.url) +
          '?' +
          _.join(query, '&') +
          (sort ? '&sort=' + _.join(sorts, ',') : '') +
          (filter ? '&constraints=' + JSON.stringify(filter) : '') +
          (search ? '&search=' + search : '')
      )
      .pipe(
        tap(result => {
          AppInjector.get(PreloaderService).hide();
        }),
        map(result =>
          _.assign(
            {},
            {
              items: (result as any).data.map(item => new classes[this.modelName](item)),
              total: (result as any).meta.pagination.total,
              pagination: new LengthAwarePaginator((result as any).meta.pagination)
            }
          )
        ),
        catchError(error => {
          AppInjector.get(PreloaderService).hide();
          throw error;
        })
      );
  }

  /**
   * Get list of all resource
   *
   * @param params Optional
   *
   * @return Observable
   */
  list(params = {}): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.post(this.apiUrl.getApiUrl(`${this.url}/list`), JSON.stringify(params)).pipe(
      tap(result => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(result => _.map((result as any).data, item => new classes[this.modelName](item))),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  /**
   * Update resource by given id
   *
   * @param Object
   *
   * @return Observable
   */
  update(data): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/' + data.id, data).pipe(
      tap(result => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(result => new classes[this.modelName]((result as any).data)),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  /**
   * Delete resource by given id
   *
   * @param id
   *
   * @return Observable
   */
  delete(id): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        AppInjector.get(PreloaderService).hide();
      }),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  create(data): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
      tap(result => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(result => new classes[this.modelName]((result as any).data)),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  getItemById(id): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(result => new classes[this.modelName]((result as any).data)),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  sort(data): Observable<any> {
    // tslint:disable-next-line:forin
    AppInjector.get(PreloaderService).show();
    let query = [];
    for (const prop in data) {
      if (data[prop] !== null) {
        query.push(data[prop] + prop);
      }
    }

    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?sort=' + _.join(query, ',')).pipe(
      tap(results => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(results =>
        _.assign(
          {},
          {
            items: (results as any).data.map(item => new classes[this.modelName](item)),
            total: (results as any).meta.pagination.total
          }
        )
      ),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  filter(query): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?constraints=' + JSON.stringify(query)).pipe(
      tap(results => {
        AppInjector.get(PreloaderService).hide();
      }),
      // map(results => _.assign({}, { items: (results as any).data.items.map(item => new new classes[this.modelName](item)), total: (results as any).data.total })),
      map(results => {
        return _.assign(
          {},
          {
            items: (results as any).data.map(item => new classes[this.modelName](item)),
            total: (results as any).meta.pagination.total
          }
        );
      }),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }

  search(query): Observable<any> {
    AppInjector.get(PreloaderService).show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?search=' + query).pipe(
      tap(results => {
        AppInjector.get(PreloaderService).hide();
      }),
      map(results =>
        _.assign(
          {},
          {
            items: (results as any).data.map(item => new classes[this.modelName](item)),
            total: (results as any).meta.pagination.total
          }
        )
      ),
      catchError(error => {
        AppInjector.get(PreloaderService).hide();
        throw error;
      })
    );
  }
}
