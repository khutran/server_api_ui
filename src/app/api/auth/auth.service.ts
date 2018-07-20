import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import User from '../../models/User';
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {

  protected url = '/api/v1/auth';

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrl
  ) {

  }

  login(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/login', data)
      .pipe(
        tap(result => {
          // console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  create(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/register', data)
      .pipe(
        tap(result => {
          // console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  resetPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/reset-password', data)
      .pipe(
        tap(result => {
          console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  forgotPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/forgot-password', data)
      .pipe(
        tap(result => {
          console.log(result);
        }),
        catchError(error => {
          throw error;
        })
      );
  }
}
