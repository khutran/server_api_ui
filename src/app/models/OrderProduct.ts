import Model from './Model';

class OrderProduct extends Model {
  constructor(options) {
    super();

    this.bind(options);
  }
}

export default OrderProduct;
