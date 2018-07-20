import Model from './Model';
import ProcessType from './ProcessType';
import ProcessStatus from './ProcessStatus';

class ProcessTransition extends Model {
  constructor(options) {
    super();

    (this as any).process_type = type => {
      return new ProcessType(type);
    };

    (this as any).from_process_status = status => {
      return new ProcessStatus(status);
    };

    (this as any).to_process_status = status => {
      return new ProcessStatus(status);
    };

    this.bind(options);
  }
}

export default ProcessTransition;
