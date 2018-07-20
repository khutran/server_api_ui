import { CREATE_PRODUCT_SUCCEEDED } from "./create.actions";
import * as _ from 'lodash';

export const create = (state = { created: false }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_SUCCEEDED:
      return _.assign({}, state, { created: true, last_product: action.data });

    default:
      return state;
  }
}
