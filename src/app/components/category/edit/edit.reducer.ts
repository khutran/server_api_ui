import { EDIT_CATEGORY_SUCCEEDED, GET_CATEGORY_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false, item: {} }, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_CATEGORY_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
