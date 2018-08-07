import { CREATE_PROJECT_SUCCEEDED, RENDER_CREATE_PROJECT_FORM_REQUESTED, UPDATE_CREATE_PROJECT_INPUT_OPTIONS } from './create.actions';
import * as _ from 'lodash';

export const create = (state: any = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCEEDED:
      return _.assign({}, state, { created: true, item: action.data, domain: action.domain });
    case RENDER_CREATE_PROJECT_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case UPDATE_CREATE_PROJECT_INPUT_OPTIONS:
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
