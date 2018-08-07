import Model from './Model';
import ProjectStatus from './ProjectStatus';
import ProjectFramework from './ProjectFramework';
import Host from './Host';
import User from './User';
import * as _ from 'lodash';

class Project extends Model {
  constructor(options) {
    super();
    (this as any).status = d => {
      return new ProjectStatus(d.data);
    };
    (this as any).framework = d => {
      return new ProjectFramework(d.data);
    };
    (this as any).host = d => {
      return new Host(d.data);
    };
    (this as any).users = d => {
      return new _.map(d.data, item => new User(item));
    };
    this.bind(options);
  }
}

export default Project;
