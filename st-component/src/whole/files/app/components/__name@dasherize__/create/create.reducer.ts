import { CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED } from './create.actions';
import * as _ from 'lodash';

export const create = (state = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { created: true, item: action.data });

    default:
      return state;
  }
}
