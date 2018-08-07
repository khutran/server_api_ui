import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Server from '../../models/Server';

@Injectable()
export class ServerService extends ServiceProvider {
  public url = '/api/v1/servers';
  public model = Server;
}
