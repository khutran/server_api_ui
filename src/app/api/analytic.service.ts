import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { ApiUrl } from './api-url.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class AnalyticService {
  protected url = '/api/v1/analytic';

  constructor(private http: HttpClient, private apiUrl: ApiUrl) {}

  /**
   * Get number of product per destination
   *
   * @return Observable
   */
  getNumberOfProductPerDestination(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(`${this.url}/destination/product`)).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  /**
   * Get number of product per location
   *
   * @param Object {destination_id: Number}
   *
   * @return Observable
   */
  getNumberOfProductPerLocation(params: any = {}): Observable<any> {
    if (!_.isUndefined(params.location_ids)) {
      params = _.assign(params, { location_ids: params.location_ids.join(',') });
    }
    return this.http.get(this.apiUrl.getApiUrl(`${this.url}/location/product`), { params: params }).pipe(
      map(result => (result as any).data),
      catchError(error => {
        throw error;
      })
    );
  }
}
