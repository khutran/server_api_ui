import { AppInjector } from './../../app-injector';
import { ApiUrl } from './../api-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';

@Injectable()
export class ProcessTypesService extends ServiceProvider {

  protected url = '/api/v1/processtype';

  constructor(
  ) {
    super(
      AppInjector.get(HttpClient),
      AppInjector.get(ApiUrl),
      'ProcessType'
    );
  }

}

