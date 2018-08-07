import { GET_INFO_ENV_SUCCEEDED, EDIT_INFO_ENV_SUCCEEDED } from './env.actions';
import * as _ from 'lodash';
import { InputBase } from '../../../common/nfreactive-form/models/InputBase';
import { TextBox } from '../../../common/nfreactive-form/models/TextBox';
import { Validators } from '../../../../../node_modules/@angular/forms';


export const envedit = (state = {
  updated: false,
  fetched: false,
  inputs: []
}, action) => {
  switch (action.type) {
    case GET_INFO_ENV_SUCCEEDED:
      let inputs: InputBase<any>[] = [];
      _.forEach(action.data, function (value, key) {
        if (key != 'id') {
          inputs.push(
            new TextBox({
              key: key,
              label: key,
              classes: ['col-12'],
              // validators: [Validators.required],
              group_classes: ['col-12'],
              group: 1,
              value: value
            })
          );
        }
      });
      return _.assign({}, state, {
        fetched: true,
        env: _.assign(action.data, { id_project: +action.id_project }),
        inputs: inputs
      });
    case EDIT_INFO_ENV_SUCCEEDED:
      return _.assign({}, state, {
        updated: true
      });
    default:
      return state;
  }
};