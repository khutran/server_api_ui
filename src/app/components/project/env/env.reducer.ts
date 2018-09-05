import { GET_INFO_ENV_SUCCEEDED, EDIT_INFO_ENV_SUCCEEDED, ADD_PROPERTIE_ENV_SUCCESSED } from './env.actions';
import * as _ from 'lodash';
import { InputBase } from '../../../common/nfreactive-form/models/InputBase';
import { TextBox } from '../../../common/nfreactive-form/models/TextBox';
import { Store } from '../../../store/store.module';

export const envedit = (
  state = {
    updated: false,
    fetched: false,
    inputs: []
  },
  action
) => {
  switch (action.type) {
    case GET_INFO_ENV_SUCCEEDED:
      let inputs: InputBase<any>[] = [];
      _.forEach(action.data, function(value, key) {
        if (key !== 'id') {
          inputs.push(
            new TextBox({
              key: key,
              label: key,
              value: value
            })
          );
        }
      });
      return _.assign({}, state, {
        fetched: true,
        env: action.data,
        inputs: inputs
      });

    case ADD_PROPERTIE_ENV_SUCCESSED:
      state.inputs.unshift(
        new TextBox({
          key: action.data.label,
          label: action.data.key,
          classes: ['col-12'],
          group_classes: ['col-12'],
          group: 1,
          value: null
        })
      );
      return state;
    case EDIT_INFO_ENV_SUCCEEDED:
      return _.assign({}, state, {
        updated: true
      });
    default:
      return state;
  }
};
