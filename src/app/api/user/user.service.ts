// import { Observable } from 'rxjs/Observable';
// import { ApiUrl } from './../api-url.service';
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { tap, catchError, map } from 'rxjs/operators';
// import User from '../../models/User';
// import * as _ from 'lodash';
// import LengthAwarePaginator from '../../models/LengthAwarePaginator';

// @Injectable()
// export class UserService {
//   private url = '/api/v1/me';
//   private userUrl = '/api/v1/users';

//   constructor(private http: HttpClient, private apiUrl: ApiUrl) {}

//   get(): Observable<any> {
//     return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
//       tap(results => {
//         // console.log(results);
//       }),
import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import User from '../../models/User';

@Injectable()
export class UserService extends ServiceProvider {
  protected url = '/api/v1/users';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'User');
  }

  profile(params: {}): Observable<any> {
    const meUrl = '/api/user/me';
    return this.http.get(this.apiUrl.getApiUrl(meUrl), { params }).pipe(
      map(result => new User((result as any).data)),
      catchError(error => {
        throw error;
      })
    );
  }

  addCustomer(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/' + data.user_id + '/customer', data).pipe(
      tap(result => {
        // console.log(result);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  attachRoleToUser(userId, roleId): Observable<any> {
    return this.http
      .put(this.apiUrl.getApiUrl(this.url) + `/${userId}/role`, {
        role_id: roleId
      })
      .pipe(
        tap(result => {
          console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  detachRoleFromUser(data): Observable<any> {
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + `/${data.userId}/role/${data.roleId}`).pipe(
      tap(result => {
        console.log(result);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  saveRoleUser(userId, roles): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.url) + `/${userId}/roles`, roles).pipe(
      tap(result => {
        console.log(result);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
