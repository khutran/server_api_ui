import Model from './Model';
import Destination from './Destination';
import Location from './Location';
import User from './User';
import Product from './Product';

class Event extends Model {
  constructor(options) {
    super();

    (this as any).destination = d => {
      return new Destination(d.data);
    };

    (this as any).location = d => {
      return new Location(d.data);
    };

    (this as any).user = d => {
      return new User(d.data);
    };

    (this as any).product = d => {
      return new Product(d.data);
    };

    this.bind(options);
  }
}

export default Event;
