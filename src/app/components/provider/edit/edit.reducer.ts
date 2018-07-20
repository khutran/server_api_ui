import { EDIT_PROVIDER_SUCCEEDED, GET_PROVIDER_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case GET_PROVIDER_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_PROVIDER_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
