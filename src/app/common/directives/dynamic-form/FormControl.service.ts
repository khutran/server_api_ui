import { InputBase } from './Input/InputBase';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormControlService {
  constructor() {}

  toFormGroup(inputs: InputBase<any>[]) {
    let group: any = {};

    inputs.forEach(input => {
      group[input.key] = input.required ? new FormControl(input.value || '', Validators.required) : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }
}
