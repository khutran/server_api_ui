import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';

@Injectable()
export class CustomerService extends ServiceProvider {

  protected url = '/api/v1/customer';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'Customer'
    );
  }

  createAddress(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + data.customer_id, data)
      .pipe(
        tap(result => {
          // console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  getAddresses(customerId): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + customerId + '/customer')
      .pipe(
        tap(results => {
          // console.log(results);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  updateAddress(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.url) + data.customer_id + '/' + data.id, data)
      .pipe(
        tap(result => {
          // console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  deleteAddress(customerId, addressId): Observable<any> {
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + customerId + '/' + addressId)
      .pipe(
        tap(result => {
          // console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }
}
