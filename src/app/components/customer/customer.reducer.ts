import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { FETCH_ALL_CUSTOMER_GROUP_SUCCEEDED } from './customer.actions';
import * as _ from 'lodash';

const groups = (
  state = {
    fetched: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_CUSTOMER_GROUP_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        items: action.data
      });

    default:
      return state;
  }
};

export const Customer = combineReducers({
  list,
  edit,
  create,
  groups
});
