import Model from './Model';
import * as _ from 'lodash';

export class Address extends Model {
	constructor(options) {
		super();

		this.bind(options);
	}
}
