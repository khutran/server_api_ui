import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Framework from '../../models/Framework';

@Injectable()
export class FrameworkService extends ServiceProvider {
  public url = '/api/v1/frameworks';
  public model = Framework;
}
