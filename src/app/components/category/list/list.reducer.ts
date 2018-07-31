import { FETCH_CATEGORIES_SUCCEEDED, SORT_CATEGORIES_SUCCEEDED } from './list.actions';
import * as _ from 'lodash';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, pagination: action.pagination });

    case SORT_CATEGORIES_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, total: action.total });

    default:
      return state;
  }
};
