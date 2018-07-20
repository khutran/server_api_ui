import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import DestinationType from '../../models/DestinationType';
import * as _ from 'lodash';

@Injectable()
export class DestinationService extends ServiceProvider {

  protected url = '/api/v1/destination';
  protected urlTypes = '/api/v1/destinationtype/';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'Destination'
    );
  }

  getTypes(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.urlTypes)).
      pipe(
        tap(results => {
          console.log(results);
        }),
        map(results => _.assign({}, { items: (results as any).data.items.map(item => new DestinationType(item)), total: (results as any).data.total })),
        catchError(error => {
          throw error;
        })
      );
  }

  createType(type): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.urlTypes), type).
      pipe(
        tap(result => {
          console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

}
