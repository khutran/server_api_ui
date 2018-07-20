import * as _ from 'lodash';
import { FETCH_CONSTANTS_SUCCEEDED } from './list.actions';

export const list = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONSTANTS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    default:
      return state;
  }
};
