import { FETCH_ALL_ROLE_SUCCEEDED } from './../../acl/roles/list/list.actions';
import * as _ from 'lodash';
import { FETCH_USER_DETAIL_SUCCEEDED } from './edit.actions';

export const editUser = (
  state = {
    fetched: false,
    item: {}
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER_DETAIL_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        item: action.data
      });

    case FETCH_ALL_ROLE_SUCCEEDED:
      return _.assign({}, state, {
        roles: _.map(action.data, item => {
          const role = _.find((state as any).item.roles, i => item.getId() === i.getId());
          if (role) {
            return _.assign({}, role, { checked: true });
          } else {
            return item;
          }
        }),
        item: _.assign(_.clone(state.item), {
          roles: _.map((state as any).item.roles, i => {
            return _.find(action.data, v => i.getId() === v.getId());
          })
        })
      });

    default:
      return state;
  }
};
