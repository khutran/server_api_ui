import { EDIT_TEST_SUCCEEDED, GET_TEST_SUCCEEDED, RENDER_EDIT_TEST_FORM_REQUESTED, FILL_TEST_DETAIL_FORM } from './edit.actions';
import * as _ from 'lodash';

const Input = (state: any = {}, action) => {
  switch (action.type) {
    case FILL_TEST_DETAIL_FORM:
      if (!_.isUndefined(_.get(action.data, state.key))) {
        state.value = _.get(action.data, state.key);
      }
      return state;
    default:
      return state;
  }
};

export const edit = (state = { updated: false, fetched: false, inputs: [] }, action) => {
  switch (action.type) {
    case RENDER_EDIT_TEST_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case FILL_TEST_DETAIL_FORM:
      return _.assign({}, state, { inputs: _.map(state.inputs, item => Input(item, action)) });
    case GET_TEST_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_TEST_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
};
