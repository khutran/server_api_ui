import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from './FormControl.service';
import { InputBase } from './Input/InputBase';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {
  groups: InputBase<any>[] = [];
  @Input() inputs: InputBase<any>[] = [];
  @Input() onSubmit: Function;
  @Input() submitText?: String;
  form: FormGroup;
  submitted: Boolean = false;

  constructor(private fcs: FormControlService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let groups = [];
    let ordered = _.groupBy(this.inputs, 'order');
    // tslint:disable-next-line:forin
    for (let k in ordered) {
      groups.push({
        order: k,
        items: ordered[k],
        classes: _.head(ordered[k]).group_classes
      });
    }
    this.groups = groups;
    this.form = this.fcs.toFormGroup(this.inputs);
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }
    this.onSubmit.apply(null, [this.form]);
  }
}
