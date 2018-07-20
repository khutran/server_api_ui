import { FORGOT_PASSWORD_SUCCEEDED } from "./forgot-password.actions";
import * as _ from 'lodash';

export const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCEEDED:
      return _.assign({}, state, { isSent: true });

    default:
      return state;
  }
}
