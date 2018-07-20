import Model from './Model';
import * as _ from 'lodash';
import { Address } from './Address';
import UserBase from './Base/UserBase';

class User extends UserBase {}

class Customer extends Model {
  constructor(options) {
    super();

    (this as any).addresses = d => {
      return _.map(d.data, item => new Address(item));
    };

    (this as any).user = d => {
      return new User(d.data);
    };

    (this as any).phone = d => {
      return _.assign(
        {},
        {
          code: options.phone_code,
          value: options.phone
        }
      );
    };

    this.bind(options);
  }

  public getFullName() {
    let firstName = '';
    let lastName = '';
    if (!_.isUndefined((this as any).first_name)) {
      firstName = (this as any).first_name;
    }
    if (!_.isUndefined((this as any).last_name)) {
      firstName = (this as any).last_name;
    }
    return `${firstName} ${lastName}`;
  }

  public getMainAddress() {
    return (this as any).addresses ? (this as any).addresses.find(s => s.is_default) : null;
  }
}

export default Customer;
