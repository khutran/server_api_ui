import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { InputBase } from '../../models/InputBase';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FormControlService } from '../../services/form-control.service';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  providers: [FormControlService]
})
export class ReactiveFormComponent implements OnInit, OnChanges {
  groups: InputBase<any>[] = [];
  @Input()
  inputs: InputBase<any>[] = [];
  @Input()
  onSubmit?: Function;
  @Input()
  submitText?: String;
  form: FormGroup;
  submitted: Boolean = false;
  constructor(private fcs: FormControlService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let groups = [];
    let grouped = _.groupBy(this.inputs, 'group');
    // tslint:disable-next-line:forin
    for (let k in grouped) {
      groups.push({
        group: k,
        items: grouped[k],
        classes: _.head(grouped[k]).group_classes
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
    if (this.onSubmit !== undefined) {
      this.onSubmit.apply(null, [this.form]);
    }
  }
}
