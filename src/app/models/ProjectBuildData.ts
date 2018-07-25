import Model from "./Model";
import Host from "./Host";

class ProjectBuildData extends Model {
  constructor(options) {
    super();
    (this as any).host = d => {
      return new Host(d.data);
    };
    this.bind(options);
  }
}

export default ProjectBuildData;
