import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Project from '../../models/Project';

@Injectable()
export class ProjectService extends ServiceProvider {
  public url = '/api/v1/projects';
  public model = Project;
}
