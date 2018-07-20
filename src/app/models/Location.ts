import Model from './Model';
import DestinationBase from './Base/DestinationBase';
import * as _ from 'lodash';

class Destination extends DestinationBase {
  constructor(options) {
    super(options);
    this.bind(options);
  }
}

export interface LocationInterface {
  id: Number;
  getId(): Number;
  getNumberOfProduct(): Number;
}
class Location extends Model implements LocationInterface {
  id: Number;
  getId(): Number {
    return (this as any).id;
  }
  constructor(options) {
    super();

    (this as any).destination = d => {
      return new Destination(d);
    };

    this.bind(options);
  }
  getNumberOfProduct(): Number {
    if (_.isUndefined((this as any).number_of_product) || _.isUndefined((this as any).number_of_product.count)) {
      return 0;
    }
    return (this as any).number_of_product.count;
  }
}

export default Location;
