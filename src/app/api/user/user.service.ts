import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import User from '../../models/User';

@Injectable()
export class UserService extends ServiceProvider {
  public url = '/api/v1/users';
  public model = User;

  profile(params: {}): Observable<any> {
    const meUrl = '/api/v1/me';
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

  assignProjectToUser(userId, data) {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/' + userId + '/projects', data).pipe(
      tap(result => {
        // console.log(result);
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
