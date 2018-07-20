import Model from './Model';
import Product from './Product';
import Location from './Location';
import Destination from './Destination';

export interface InventoryInterface {
  getId();
  saveChanged();
  getLocationId(): Number;
  getDestinationId(): Number;
  getProductId(): Number;
}

class Inventory extends Model implements InventoryInterface {
  constructor(options) {
    super();

    (this as any).product = d => {
      return new Product(d.data);
    };

    (this as any).location = d => {
      return new Location(d.data);
    };

    (this as any).destination = d => {
      return new Destination(d.data);
    };

    this.bind(options);

    this._backup(['destination_id', 'location_id']);
  }

  saveChanged() {
    this._backup(['destination_id', 'location_id']);
  }

  getId() {
    return (this as any).id;
  }
  getLocationId() {
    return (this as any).location_id;
  }

  getDestinationId() {
    return (this as any).destination_id;
  }

  getProductId() {
    return (this as any).product_id;
  }
}

export default Inventory;
