import { FETCH_COURIERS_SUCCEEDED, SORT_COURIERS_SUCCEEDED } from './list.actions';
import * as _ from 'lodash';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_COURIERS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, pagination: action.pagination });

    case SORT_COURIERS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, total: action.total });

    default:
      return state;
  }
};
