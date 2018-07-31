import { InputBase } from './Input/InputBase';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class FormControlService {
  constructor() {}

  toFormGroup(inputs: InputBase<any>[]) {
    let group: any = {};

    inputs.forEach(input => {
      let formControl: FormControl;
      formControl = input.required ? new FormControl(input.value || '', Validators.required) : new FormControl(input.value || '');
      group[input.key] = formControl;
    });
    return new FormGroup(group);
  }
}
