import { ApiUrl } from './api-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import LengthAwarePaginator from '../models/LengthAwarePaginator';
import { PreloaderService } from '../common/services/preloader/preloader.service';
import { AppInjector } from '../app-injector';

export class ServiceProvider {
  public url = '';
  public model;
  public http;
  public apiUrl;
  public preloader;

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.apiUrl = AppInjector.get(ApiUrl);
    this.preloader = AppInjector.get(PreloaderService);
  }
  /**
   * Get list of all resource with pagination
   *
   * @param param Optinal
   *
   * @return Observable
   */
  get(params: {}): Observable<any> {
    this.preloader.show();
    console.log(params);
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url), { params: queryParams }).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result =>
        _.assign(
          {},
          {
            items: (result as any).data.map(item => new this.model(item)),
            pagination: new LengthAwarePaginator((result as any).meta.pagination)
          }
        )
      ),
      catchError(error => {
        this.preloader.hide();
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
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(`${this.url}/list`), params).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => _.map((result as any).data, item => new this.model(item))),
      catchError(error => {
        this.preloader.hide();
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
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/' + data.id, data).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
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
    this.preloader.show();
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  create(data): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  getItemById(id): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  sort(data): Observable<any> {
    // tslint:disable-next-line:forin
    this.preloader.show();
    let query = [];
    for (const prop in data) {
      if (data[prop] !== null) {
        query.push(data[prop] + prop);
      }
    }

    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?sort=' + _.join(query, ',')).pipe(
      tap(results => {
        this.preloader.hide();
      }),
      map(results =>
        _.assign(
          {},
          {
            items: (results as any).data.map(item => new this.model(item)),
            total: (results as any).meta.pagination.total
          }
        )
      ),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  filter(query): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?constraints=' + JSON.stringify(query)).pipe(
      tap(results => {
        this.preloader.hide();
      }),
      // map(results => _.assign({}, { items: (results as any).data.items.map(item => new new this.model(item)), total: (results as any).data.total })),
      map(results => {
        return _.assign(
          {},
          {
            items: (results as any).data.map(item => new this.model(item)),
            total: (results as any).meta.pagination.total
          }
        );
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  search(query): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '?search=' + query).pipe(
      tap(results => {
        this.preloader.hide();
      }),
      map(results =>
        _.assign(
          {},
          {
            items: (results as any).data.map(item => new this.model(item)),
            total: (results as any).meta.pagination.total
          }
        )
      ),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }
}
