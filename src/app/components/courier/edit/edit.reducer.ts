import { EDIT_COURIER_SUCCEEDED, GET_COURIER_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case GET_COURIER_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_COURIER_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
