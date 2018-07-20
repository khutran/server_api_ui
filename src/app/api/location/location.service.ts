import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import Location from './../../models/Location';

@Injectable()
export class LocationService extends ServiceProvider {

  protected url = '/api/v1/location';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'Location'
    );
  }

  getLocationByDestinationId(destinationId): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url))
      .pipe();
  }

  getLocationByCode(code): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/code/' + code)
      .pipe(
        tap(result => {
          console.log(result);
        }),
        map(result => new Location((result as any).data)),
        catchError(error => {
          throw error;
        })
      );
  }
}
