import * as _ from 'lodash';
import { UPDATE_ORDER_SUCCEEDED } from './edit.actions';

export const edit = (state = { updated: false }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
};

