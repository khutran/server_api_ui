import { EDIT_PROJECT_SUCCEEDED, GET_PROJECT_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_PROJECT_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
