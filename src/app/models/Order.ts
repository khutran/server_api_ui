import { Address } from './Address';
import * as _ from 'lodash';
import Model from './Model';
import UserBase from './Base/UserBase';
import Product from './Product';
import Customer from './Customer';

class User extends UserBase {
	constructor(options) {
		super(options);
		this.bind(options);
	}
}

class Order extends Model {
	user: (d: any) => void;
	constructor(options) {
		super();

		(this as any).user = d => {
			return new User(d.data);
		};

		(this as any).products = d => {
			return _.map(d.data, item => new Product(item));
		};

		(this as any).addresses = d => {
			return _.map(d.data, item => new Address(item));
		};

		(this as any).shipping_address = d => {
			return new Address(d.data);
		};

		(this as any).billing_address = d => {
			return new Address(d.data);
		};

		(this as any).customer = d => {
			return new Customer(d.data);
		};

		this.bind(options);
	}

	getFullName() {
		return (this as any).first_name + ' ' + (this as any).last_name;
	}
}

export default Order;
