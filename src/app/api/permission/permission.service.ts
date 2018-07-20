import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { tap, map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import Permission from '../../models/Permission';
import Role from '../../models/Role';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PermissionService extends ServiceProvider {

  protected url = '/api/v1/permissions';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'Permission'
    );
  }

  getAllPermissionsGroup(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/group')
      .pipe(
        tap(results => {
          // console.log(results);
        }),
        map(results => _.map((results as any).data, item => new Role(item))),
        catchError(error => {
          throw error;
        })
      );
  }

}
