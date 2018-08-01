import * as _ from 'lodash';
import { EDIT_PROJECT_REQUESTED, RENDER_EDIT_PROJECT_FORM_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import { Validators } from '../../../../../node_modules/@angular/forms';
import { Dropdown } from '../../../common/nfreactive-form/models/Dropdown';
import { InputBase } from '../../../common/nfreactive-form/models/InputBase';
import { TextBox } from '../../../common/nfreactive-form/models/TextBox';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public store;
  constructor(private activatedRoute: ActivatedRoute, store: Store) {
    this.activatedRoute = activatedRoute;
    this.store = store.getInstance();
  }

  ngOnInit() {
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
    this.store.dispatch({ type: RENDER_EDIT_PROJECT_FORM_REQUESTED, data: { project_id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }
  getData() {
    console.log('store', this.store.getState());
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
      store.dispatch({
        type: EDIT_PROJECT_REQUESTED,
        data: _.assign(data, { id: store.getState().Project.edit.item.id })
      });
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
