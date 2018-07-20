import { combineReducers } from 'redux';
import { listUser } from './list/list.reducer';
import { createUser } from './create/create.reducer';
import { editUser } from './edit/edit.reducer';
import { FETCH_USER_DETAIL_SUCCEEDED } from './edit/edit.actions';
import * as _ from 'lodash';

const common = (
  state = {
    fetched: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER_DETAIL_SUCCEEDED:
      return _.assign({}, state, {
        fetched: false,
        items: []
      });
    default:
      return state;
  }
};

export const Users = combineReducers({
  common,
  listUser,
  createUser,
  editUser,
});
