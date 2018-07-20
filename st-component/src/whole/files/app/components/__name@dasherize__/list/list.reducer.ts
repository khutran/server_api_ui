import { FETCH_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, SORT_<%= underscore(name).toUpperCase() %>S_SUCCEEDED } from './list.actions';
import * as _ from 'lodash';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_<%= underscore(name).toUpperCase() %>S_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, pagination: action.pagination });

    case SORT_<%= underscore(name).toUpperCase() %>S_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: action.data, total: action.total });

    default:
      return state;
  }
};
