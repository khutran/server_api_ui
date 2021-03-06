import { CREATE_FRAMEWORK_SUCCEEDED, RENDER_CREATE_FRAMEWORK_FORM_REQUESTED } from './create.actions';
import * as _ from 'lodash';

export const create = (state = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_FRAMEWORK_SUCCEEDED:
      return _.assign({}, state, { created: true, item: action.data });
    case RENDER_CREATE_FRAMEWORK_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    default:
      return state;
  }
};
