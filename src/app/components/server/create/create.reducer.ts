import { CREATE_SERVER_SUCCEEDED } from './create.actions';
import * as _ from 'lodash';
import { RENDER_CREATE_CATEGORY_FORM_REQUESTED } from '../../category/create/create.actions';

export const create = (state = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_SERVER_SUCCEEDED:
      return _.assign({}, state, { created: true, item: action.data });
    case RENDER_CREATE_CATEGORY_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    default:
      return state;
  }
};
