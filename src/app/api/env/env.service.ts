import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Environment from '../../models/Env';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class EnvService extends ServiceProvider {
  public url = '/api/v1/remote/project';
  public model = Environment;

  getEnvById(id): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id + '/config').pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }
  updateEnvById(data, id): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/' + id + '/config', data).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      // map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }
}
