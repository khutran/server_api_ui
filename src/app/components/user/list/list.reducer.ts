import * as _ from 'lodash';
import { FETCH_ALL_USER_SUCCEEDED, DELETE_USER_SUCCEEDED } from './list.actions';

export const listUser = (
  state = {
    fetched: false,
    loading: false,
    items: [],
    pagination: {},
    deleted: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_USER_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        items: action.data.items,
        pagination: action.data.pagination,
        loading: false
      });

    case DELETE_USER_SUCCEEDED:
      return _.assign({}, state, {
        deleted: true,
        loading: false
      });

    default:
      return state;
  }
};
