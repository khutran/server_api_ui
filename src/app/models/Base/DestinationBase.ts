import Model from '../Model';
import * as _ from 'lodash';
import DestinationType from '../DestinationType';
interface DestinationInterface {
  id: Number;
  detination_type_id: Number;
  detination_type: DestinationType;
}
class DestinationBase extends Model implements DestinationInterface {
  id: Number;
  detination_type_id: Number;
  detination_type: DestinationType;
  constructor(options) {
    super();

    this.bind(options);
  }

  getLocations() {
    return (this as any).locations;
  }

  getTotalItems() {
    let locations = (this as any).locations;
    if (!_.isArray(locations)) {
      return 0;
    } else {
      return _.sumBy(locations, item => {
        if (!_.isArray(item.products)) {
          return 0;
        } else {
          return item.products.length;
        }
      });
    }
  }
}

export default DestinationBase;
