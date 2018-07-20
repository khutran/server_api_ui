import { GET_DESIGNER_SUCCEEDED, EDIT_DESIGNER_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';

export const edit = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case GET_DESIGNER_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_DESIGNER_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
}
