import { CREATE_PROJECT_REQUESTED, RENDER_CREATE_PROJECT_FORM_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private store;
  private project = {
    name: ''
  };

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'name',
        label: 'Name',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      }),
      new TextBox({
        key: 'package_manager',
        label: 'Package Control',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      })
    ];
    this.store.dispatch({ type: RENDER_CREATE_PROJECT_FORM_REQUESTED, data: { inputs: inputs } });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({ type: CREATE_PROJECT_REQUESTED, data: this.project });
    }
  }
}
