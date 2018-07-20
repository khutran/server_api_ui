import { CREATE_USER_SUCCEEDED } from './create.actions';
import * as _ from 'lodash';

export const create = (state = { created: false }, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCEEDED:
      return _.assign({}, state, { created: true });

    default:
      return state;
  }
};
