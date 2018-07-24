import Model from './Model';
import ProjectStatus from './ProjectStatus';
import ProjectFramework from './ProjectFramework';
import ProjectBuildData from './ProjectBuildData';

class Project extends Model {
  constructor(options) {
    super();
    (this as any).status = d => {
      return new ProjectStatus(d.data);
    };
    (this as any).framework = d => {
      return new ProjectFramework(d.data);
    };
    (this as any).build = d => {
      return new ProjectBuildData(d.data);
    };
    this.bind(options);
  }
}

export default Project;
