import Model from './Model';
interface DestinationTypeInterface {
  id: Number;
  name: String;
}
class DestinationType extends Model implements DestinationTypeInterface {
  id: Number;
  name: String;
  constructor(options) {
    super();

    this.bind(options);
  }
}

export default DestinationType;
