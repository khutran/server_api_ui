import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Project from '../../models/Project';
import { Observable } from '../../../../node_modules/rxjs';
import { tap, map, catchError } from '../../../../node_modules/rxjs/operators';
// import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectService extends ServiceProvider {
  public url = '/api/v1/projects';
  public model = Project;
  public buildUrl = '/api/v1/remote/project';

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

  clone(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id, {}).pipe(
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

  pull(id): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'pull', {}).pipe(
      tap(result => {
        // this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  runBuild(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'run-build', {}).pipe(
      tap(result => {
        // this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  createDb(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'db', {}).pipe(
      tap(result => {
        // this.preloader.hide();
      }),
      map(result => result),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  createConfig(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'config', {}).pipe(
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

  updateConfig(id, db, user, pass): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'config', { db_name: db, user_name: user, password: pass }).pipe(
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

  runPackageControl(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'project-manager', {}).pipe(
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

  runFirtsBuild(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'firts-build', {}).pipe(
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

  replaceDb(id): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'replace', {}).pipe(
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

  getUsersByIdProject(id): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id + '/user').pipe(
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

  updateDomainPointingIP(data): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/cloudflare/dns') + `/?name=${data.name}`, data).pipe(
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

  domainPointingIP(data): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl('/api/v1/cloudflare/dns'), data).pipe(
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

  deleteDbProject(id): Observable<any> {
    this.preloader.show();
    return this.http.delete(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/db').pipe(
      tap(result => {
        this.preloader.hide();
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  deleteCodeProject(id): Observable<any> {
    this.preloader.show();
    return this.http.delete(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  deleteDomainProject(nameDomain): Observable<any> {
    this.preloader.show();
    return this.http.delete(this.apiUrl.getApiUrl('/api/v1/cloudflare/dns?name=') + nameDomain).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  checkProjectAlready(id): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id).pipe(
      tap(result => {}),
      map(result => result),
      catchError(error => {
        throw error;
      })
    );
  }

  getDomainProject(nameDomain): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl('/api/v1/cloudflare/dns?name=') + nameDomain).pipe(
      tap(result => {}),
      map(result => result),
      catchError(error => {
        throw error;
      })
    );
  }

  importDb(id): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'import').pipe(
      tap(result => {}),
      map(result => result),
      catchError(error => {
        throw error;
      })
    );
  }

  runCommand(id, command): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.buildUrl) + '/' + id + '/' + 'command', { command: command }).pipe(
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
