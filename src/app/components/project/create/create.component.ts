import * as _ from 'lodash';
import { CREATE_PROJECT_REQUESTED, RENDER_CREATE_PROJECT_FORM_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { GET_ALL_CATEGORIES_REQUESTED } from '../../category/category.action';
import { Dropdown } from '../../../common/directives/dynamic-form/Input/Dropdown';
import { GET_ALL_FRAMEWORKS_REQUESTED } from '../../framework/framework.action';
import { GET_ALL_STATUSS_REQUESTED } from '../../status/status.action';
import { CustomDropdown } from '../../../common/directives/dynamic-form/Input/CustomDropdown';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: GET_ALL_CATEGORIES_REQUESTED, component: 'CREATE_PROJECT_COMPONENT' });
    this.store.dispatch({ type: GET_ALL_FRAMEWORKS_REQUESTED, component: 'CREATE_PROJECT_COMPONENT' });
    this.store.dispatch({ type: GET_ALL_STATUSS_REQUESTED, component: 'CREATE_PROJECT_COMPONENT' });

    const availablePackageManager = [{ id: 1, value: 'Composer' }, { id: 2, value: 'Yarn' }];
    const availableSqlManager = [{ id: 1, value: 'MySQL', selected: true }, { id: 2, value: 'Postgres' }, { id: 3, value: 'MongoDB' }];
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'name',
        label: 'Name',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      }),
      new Dropdown({
        key: 'framework',
        label: 'Framework',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new Dropdown({
        key: 'status',
        label: 'Status',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new Dropdown({
        key: 'category',
        label: 'Category',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 3
      }),
      new Dropdown({
        key: 'package_manager',
        label: 'Package Control',
        value: _.head(availablePackageManager),
        options: availablePackageManager,
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 3
      }),
      new Dropdown({
        key: 'sql_manager',
        label: 'SQL',
        value: _.head(availableSqlManager),
        options: availableSqlManager,
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 4
      })
    ];
    this.store.dispatch({ type: RENDER_CREATE_PROJECT_FORM_REQUESTED, data: { inputs: inputs } });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({ type: CREATE_PROJECT_REQUESTED, data: form.value });
    }
  }
}
