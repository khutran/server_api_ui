import Location from './Location';
import * as _ from 'lodash';
import DestinationType from './DestinationType';
import DestinationBase from './Base/DestinationBase';

export const DESTINATION_NORMAL_TYPE = 0;
export const DESTINATION_LOST_TYPE = 1;
export const DESTINATION_FOUND_TYPE = 2;

class Destination extends DestinationBase {
  constructor(options) {
    super(options);

    (this as any).locations = d => {
      return _.assign([], d.data.map(item => new Location(item)));
    };

    (this as any).destination_type = d => {
      return new DestinationType(d.data);
    };

    this.bind(options);
  }

  isSpecialType() {
    return (this as any).type === DESTINATION_LOST_TYPE || (this as any).type === DESTINATION_FOUND_TYPE;
  }

  isFoundType() {
    return (this as any).type === DESTINATION_FOUND_TYPE;
  }

  isLostType() {
    return (this as any).type === DESTINATION_LOST_TYPE;
  }
}

export default Destination;
