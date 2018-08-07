import { FETCH_PROJECT_DETAIL_SUCCEEDED } from './detail.actions';
import * as _ from 'lodash';

export const detail = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case FETCH_PROJECT_DETAIL_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    default:
      return state;
  }
};
