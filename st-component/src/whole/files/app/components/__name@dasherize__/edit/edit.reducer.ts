import { EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED, GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED, RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED, FILL_<%= underscore(name).toUpperCase() %>_DETAIL_FORM } from './edit.actions';
import * as _ from 'lodash';

const Input = (state: any = {}, action) => {
  switch (action.type) {
    case FILL_<%= underscore(name).toUpperCase() %>_DETAIL_FORM:
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
    case RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case FILL_<%= underscore(name).toUpperCase() %>_DETAIL_FORM:
      return _.assign({}, state, { inputs: _.map(state.inputs, item => Input(item, action)) });
    case GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return _.assign({}, state, { updated: true });

    default:
      return state;
  }
};
