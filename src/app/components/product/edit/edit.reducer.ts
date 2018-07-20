import { UPDATE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_SUCCEEDED } from "./edit.actions";
import * as _ from 'lodash';

export const edit = (state = { updated: false }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    case DELETE_PRODUCT_SUCCEEDED:
      return _.assign({}, state, { deleted: true });

    default:
      return state;
  }
}
