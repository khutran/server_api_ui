import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import Location from './../../models/Location';

@Injectable()
export class MediaService extends ServiceProvider {
  protected url = '/api/v1/media';

  constructor() {
    super(AppInjector.get(HttpClient), AppInjector.get(ApiUrl), 'Media');
  }
}
