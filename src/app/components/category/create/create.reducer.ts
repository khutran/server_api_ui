import { CREATE_CATEGORY_SUCCEEDED } from "./create.actions";
import * as _ from 'lodash';

export const create = (state = { created: false, data: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCEEDED:
      return _.assign({}, state, { created: true, data: action.data });

    default:
      return state;
  }
}
