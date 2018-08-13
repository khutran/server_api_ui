import { FETCH_ROLE_DETAIL_SUCCEEDED, FETCH_ALL_PERMISSIONS_GROUP_SUCCEEDED, SELECT_ALL_PERMISSIONS_GROUP } from './edit.actions';
import * as _ from 'lodash';

export const roleDetail = (state = { fetched: false, item: {}, groups: [] }, action) => {
  switch (action.type) {
    case FETCH_ROLE_DETAIL_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        item: action.data
      });

    case FETCH_ALL_PERMISSIONS_GROUP_SUCCEEDED:
      return _.assign({}, state, {
        groups: _.map(action.data, group => {
          return _.assign(_.clone(group), {
            permissions: _.map(group.permissions, i => {
              let pm = _.find((state as any).item.permissions, t => i.slug === t.slug);
              if (!_.isUndefined(pm)) {
                i.checked = true;
                return _.assign(_.clone(i), {
                  checked: true
                });
              }
              return _.clone(i);
            })
          });
        })
      });

    case SELECT_ALL_PERMISSIONS_GROUP:
      return _.assign({}, state, {
        groups: _.map(state.groups, item => {
          if (item.getId() === action.data.getId()) {
            return _.assign(item, {
              permissions: _.map(item.permissions, i => {
                return _.assign(i, { checked: !item.checked });
              })
            });
          }
          return item;
        })
      });

    default:
      return state;
  }
};
