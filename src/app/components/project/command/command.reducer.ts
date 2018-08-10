import { SEND_COMMAND_SUCCESSED, RENDER_CREATE_COMMAND_FORM_REQUESTED } from './command.actions';
import * as _ from 'lodash';

export const command = (state = { updated: false, fetched: false }, action) => {
  switch (action.type) {
    case SEND_COMMAND_SUCCESSED:
      return _.assign({}, state, { fetched: true, item: action.data });
    case RENDER_CREATE_COMMAND_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    default:
      return state;
  }
};
