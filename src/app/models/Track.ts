import Model from './Model';
import * as _ from 'lodash';
import Product from './Product';
import Location from './Location';

class Track extends Model {
  constructor(options) {
    super();
    (this as any).products = d => {
      return new _.map(d.data, item => new Product(item));
    };
    (this as any).location = d => new Location(d.data);
    this.bind(options);
  }
}

export default Track;
