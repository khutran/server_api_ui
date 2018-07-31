import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputBase } from '../models/InputBase';

@Injectable()
export class FormControlService {
  constructor() {}

  toFormGroup(inputs: InputBase<any>[]) {
    let group: any = {};
    inputs.forEach(input => {
      group[input.key] = new FormControl(input.value || '', input.validators);
    });
    return new FormGroup(group);
  }
}
