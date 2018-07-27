import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Test from '../../models/Test';

@Injectable()
export class TestService extends ServiceProvider {
  public url = '/api/v1/tests';
  public model = Test;
}
