import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import <%= classify(name) %> from '../../models/<%= classify(name) %>';

@Injectable()
export class <%= classify(name) %>Service extends ServiceProvider {
  public url = '/api/v1/<%= camelize(name) %>s';
  public model = <%= classify(name) %>;
}
