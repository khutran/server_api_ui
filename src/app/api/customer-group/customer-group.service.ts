import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import CustomerGroup from '../../models/CustomerGroup';
import { map, tap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerGroupService extends ServiceProvider {

  protected url = '/api/v1/customer-group';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'CustomerGroup'
    );
  }

  get(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      tap(results => {
        // console.log(results);
      }),
      map(results => _.map((results as any).data, item => new CustomerGroup(item))),
      catchError(error => {
        throw error;
      })
    );
  }

}



