import * as _ from 'lodash';
import { PRINT_RUNNING, PRINT_REQUEST, PRINT_COMPLETED } from './print.actions';

export const Print = (state = { status: false, data: {}, component: null }, action) => {
  switch (action.type) {
    case PRINT_RUNNING:
      return { status: true, data: { ...action.data }, component: action.component};
    case PRINT_COMPLETED:
      return { status: false, data: {}, component: null };
    default:
      return state;
  }
};
