import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Status from '../../models/Status';

@Injectable()
export class StatusService extends ServiceProvider {
  public url = '/api/v1/status';
  public model = Status;
}
