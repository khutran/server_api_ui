import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CustomerAddressService extends ServiceProvider {
  protected url = '/api/v1/addresses';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'CustomerAddress');
  }

  public setDefaultAddress(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/default', data).pipe(
      tap(result => {
        console.log(result);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
