import { EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED, GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
