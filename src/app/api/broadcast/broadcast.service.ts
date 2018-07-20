import { environment } from './../../../environments/environment';
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
export class BroadcastService {
  protected url = environment.broadcastUrl;

  constructor(private http: HttpClient) {}

  send(params = {}): Observable<any> {
    return this.http.post(this.url, params).pipe(
      map(result => {
        return (result as any).data;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
