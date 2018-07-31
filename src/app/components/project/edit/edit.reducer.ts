import { EDIT_PROJECT_SUCCEEDED, GET_PROJECT_SUCCEEDED, RENDER_EDIT_PROJECT_FORM_REQUESTED, FILL_PROJECT_DETAIL_FORM, UPDATE_UPDATE_PROJECT_INPUT_OPTIONS } from './edit.actions';
import * as _ from 'lodash';

const Input = (state: any = {}, action) => {
  switch (action.type) {
    case FILL_PROJECT_DETAIL_FORM:
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
    case RENDER_EDIT_PROJECT_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case FILL_PROJECT_DETAIL_FORM:
      return _.assign({}, state, { inputs: _.map(state.inputs, item => Input(item, action)) });
    case GET_PROJECT_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_PROJECT_SUCCEEDED:
      return _.assign({}, state, { updated: true });
    case UPDATE_UPDATE_PROJECT_INPUT_OPTIONS:
      return _.assign({}, state, {
        inputs: _.map(state.inputs, input => {
          if (input.key === action.input) {
            input.options = action.data;
            const selected = _.find(input.options, item => item.selected);
            if (!_.isUndefined(selected)) {
              input.value = selected;
            }
          }
          return input;
        })
      });
    default:
      return state;
  }
};
