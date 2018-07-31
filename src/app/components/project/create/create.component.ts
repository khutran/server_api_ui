import * as _ from 'lodash';
import { CREATE_PROJECT_REQUESTED, RENDER_CREATE_PROJECT_FORM_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import { GET_ALL_CATEGORIES_REQUESTED } from '../../category/category.action';
import { GET_ALL_FRAMEWORKS_REQUESTED } from '../../framework/framework.action';
import { GET_ALL_STATUSS_REQUESTED } from '../../status/status.action';
import { InputBase } from '../../../common/nfreactive-form/models/InputBase';
import { TextBox } from '../../../common/nfreactive-form/models/TextBox';
import { Dropdown } from '../../../common/nfreactive-form/models/Dropdown';
import { GET_ALL_SERVERS_REQUESTED } from '../../server/server.action';
import { Validators } from '@angular/forms';

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
    const availablePackageManager = [{ id: 1, value: 'Composer', label: 'Composer' }, { id: 2, value: 'Yarn', label: 'Yarn' }];
    const availableSqlManager = [
      { id: 1, value: 'MySQL', label: 'MySQL', selected: true },
      { id: 2, value: 'Postgres', label: 'Postgres' },
      { id: 3, value: 'MongoDB', label: 'MongoDB' }
    ];
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'name',
        label: 'Name',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 1
      }),
      new Dropdown({
        key: 'server',
        label: 'Server',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 2
      }),
      new Dropdown({
        key: 'framework',
        label: 'Framework',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 3
      }),
      new Dropdown({
        key: 'status',
        label: 'Status',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 3
      }),
      new Dropdown({
        key: 'category',
        label: 'Category',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 4
      }),
      new Dropdown({
        key: 'package_manager',
        label: 'Package Control',
        value: _.head(availablePackageManager),
        options: availablePackageManager,
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 4
      }),
      new TextBox({
        key: 'database',
        label: 'Database Name',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 5
      }),
      new Dropdown({
        key: 'sql_manager',
        label: 'SQL',
        value: _.head(availableSqlManager),
        options: availableSqlManager,
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 5
      }),
      new TextBox({
        key: 'git_remote',
        label: 'Git Remote',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 6
      }),
      new TextBox({
        key: 'git_branch',
        label: 'Git Branch',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 6
      }),
      new TextBox({
        key: 'git_application_key',
        label: 'Git Application Key',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 7
      }),
      new TextBox({
        key: 'git_application_secret',
        label: 'Git Application Secret',
        classes: ['col'],
        validators: [Validators.required],
        group_classes: ['col-12'],
        group: 7
      })
    ];
    this.store.dispatch({ type: RENDER_CREATE_PROJECT_FORM_REQUESTED, data: { inputs: inputs } });
  }

  onSubmit(form) {
    if (form.valid) {
      const store = AppInjector.get(Store).getInstance();
      const data = {
        name: form.value.name,
        status_id: form.value.status.id,
        category_id: form.value.category.id,
        framework_id: form.value.framework.id,
        csdl_id: form.value.sql_manager.id,
        server_id: form.value.server.id,
        database: form.value.database,
        git_remote: form.value.git_remote,
        git_branch: form.value.git_branch,
        git_application_key: form.value.git_application_key,
        git_application_secret: form.value.git_application_secret
      };
      store.dispatch({ type: CREATE_PROJECT_REQUESTED, data: data });
    }
  }
}
