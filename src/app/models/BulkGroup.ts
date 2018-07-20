import Model from './Model';
import Product from './Product';
import Location from './Location';

interface BulkGroupInterface {
  location: Location;
  products: Product[];
}

class BulkGroup extends Model implements BulkGroupInterface {
  location: Location;
  products: Product[];
  constructor(options) {
    super();
    this.bind(options);
  }
}

export default BulkGroup;
