import { EDIT_PROJECT_SUCCEEDED, GET_PROJECT_SUCCEEDED, RENDER_EDIT_PROJECT_FORM_REQUESTED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case RENDER_EDIT_PROJECT_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case GET_PROJECT_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_PROJECT_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
};
