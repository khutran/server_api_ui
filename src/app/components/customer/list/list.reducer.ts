import * as _ from 'lodash';
import { FETCH_CUSTOMERS_SUCCEEDED, SORT_CUSTOMERS_SUCCEEDED } from './list.actions';

export const list = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, pagination: action.pagination });

    case SORT_CUSTOMERS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, total: action.total });

    default:
      return state;
  }
};
