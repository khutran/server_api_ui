import { combineReducers } from 'redux';
import { listUser } from './list/list.reducer';
import { createUser } from './create/create.reducer';
import { editUser } from './edit/edit.reducer';
import { FETCH_USER_DETAIL_SUCCEEDED } from './edit/edit.actions';
import * as _ from 'lodash';
import { GET_ALL_USERS_NO_PAGINATION_SUCCEEDED, ASSIGN_PROJECT_TO_USER_SUCCEEDED, UN_ASSIGN_PROJECT_TO_USER_SUCCEEDED } from './user.actions';
import { PROJECT_COMP } from '../project/project.const';

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
    case ASSIGN_PROJECT_TO_USER_SUCCEEDED:
      return _.assign({}, state, {
        assigned: true
      });
    case UN_ASSIGN_PROJECT_TO_USER_SUCCEEDED:
      return _.assign({}, state, {
        unAssigned: true
      });
    case GET_ALL_USERS_NO_PAGINATION_SUCCEEDED:
      if (action.com == PROJECT_COMP) {
        if (!_.isUndefined(action.data) && !_.isUndefined(action.userIsAssigned)) {
          _.forEach(action.data, (item) => {
            let user = _.find(action.userIsAssigned, { id: item.id });
            if (!_.isNil(user)) {
              item.isAssigned = true;
            } else {
              item.isAssigned = false;
            }
          });
        }
        return _.assign({}, state, {
          fetched: true,
          items: action.data,
          com: action.com
        });
      } else {
        return _.assign({}, state, {
          fetched: true,
          items: action.data
        });
      }
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
