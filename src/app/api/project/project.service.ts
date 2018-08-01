import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Project from '../../models/Project';
import { Observable } from '../../../../node_modules/rxjs';
import { tap, map, catchError } from '../../../../node_modules/rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectService extends ServiceProvider {
  public url = '/api/v1/projects';
  public model = Project;
  public urlBuild = '/api/v1/remote/project';

  create(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), params).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  clone(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params, {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  createDb(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'db', {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  createConfig(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'config', {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  updateConfig(params, db, user, pass): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'config', { db_name: db, user_name: user, password: pass }).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  runPackageControl(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'project-manager', {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  runFirtsBuild(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'firts-build', {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  replaceDb(params): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.urlBuild) + '/' + params + '/' + 'replace', {}).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }
}
