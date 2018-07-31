import { CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED, RENDER_CREATE_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED } from './create.actions';
import * as _ from 'lodash';

export const create = (state = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { created: true, item: action.data });
    case RENDER_CREATE_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    default:
      return state;
  }
}
