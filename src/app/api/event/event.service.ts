import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { Observable } from 'rxjs/Observable';
import { tap, catchError, map } from 'rxjs/operators';
import Inventory from '../../models/Inventory';
import * as _ from 'lodash';

@Injectable()
export class EventService extends ServiceProvider {
  protected url = '/api/v1/event';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'Event');
  }

  bulk(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/bulk', data).pipe(
      map(result => _.map((result as any).data, item => new Inventory(item))),
      catchError(error => {
        throw error;
      })
    );
  }
}
