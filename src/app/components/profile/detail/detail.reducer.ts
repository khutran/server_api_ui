import * as _ from 'lodash';
import { RENDER_PROFILE_DETAIL_FORM, FILL_PROFILE_DETAIL_FORM } from './detail.action';

const Input = (state: any = {}, action) => {
  switch (action.type) {
    case FILL_PROFILE_DETAIL_FORM:
      if (!_.isUndefined(_.get(action.data, state.key))) {
        state.value = _.get(action.data, state.key);
      }
      return state;
    default:
      return state;
  }
};

export const Detail = (state = { inputs: [] }, action) => {
  switch (action.type) {
    case RENDER_PROFILE_DETAIL_FORM:
      return Object.assign({}, state, { inputs: action.data });
    case FILL_PROFILE_DETAIL_FORM:
      return Object.assign({}, state, { inputs: _.map(state.inputs, item => Input(item, action)) });
    default:
      return state;
  }
};
