import * as _ from 'lodash';
import { FETCH_ORDER_SUCCEEDED, SORT_ORDERS_SUCCEEDED } from './list.actions';
import { count } from 'rxjs/operators';

export const list = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, pagination: action.pagination });

    case SORT_ORDERS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, total: action.total });

    default:
      return state;
  }
};
