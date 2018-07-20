import { Observable } from 'rxjs/Observable';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import Constant from '../../models/Constant';
import * as _ from 'lodash';

@Injectable()
export class ConstantService {
  private url = '/api/v1/constant';

  constructor(private http: HttpClient, private apiUrl: ApiUrl) {}

  get(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      tap(results => {
      }),
      map(results => {
        return {
          item: new Constant((results as any).data)
        };
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
