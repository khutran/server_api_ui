import { FETCH_ORDER_DETAIL_SUCCEEDED, GET_ORDER_USER_PROFILE } from './detail.actions';
import * as _ from 'lodash';

export const detail = (state = { fetched: false, data: {} }, action) => {
  switch (action.type) {
    case FETCH_ORDER_DETAIL_SUCCEEDED:
      return _.assign({}, state, { fetched: true, data: action.data });

    case GET_ORDER_USER_PROFILE:
      return _.assign({}, state, {
        user: action.data
      });

    default:
      return state;
  }
};
