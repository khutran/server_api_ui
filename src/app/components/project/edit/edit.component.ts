import * as _ from 'lodash';
import { EDIT_PROJECT_REQUESTED, RENDER_EDIT_PROJECT_FORM_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { Store } from '../../../store/store.module';
import { AppInjector } from '../../../app-injector';

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
        label: 'Project Name',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      }),
      new TextBox({
        key: 'git_remote',
        label: 'Git Remote',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new TextBox({
        key: 'git_branch',
        label: 'Git Branch',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new TextBox({
        key: 'git_application_key',
        label: 'Git Application Key',
        classes: ['col'],
        group_classes: ['col-12'],
        order: 3
      }),
      new TextBox({
        key: 'git_application_secret',
        label: 'Git Application Secret',
        classes: ['col'],
        group_classes: ['col-12'],
        order: 3
      }),
      new TextBox({
        key: 'database',
        label: 'Database Name',
        classes: ['col'],
        group_classes: ['col-12'],
        order: 4
      })
    ];
    this.store.dispatch({ type: RENDER_EDIT_PROJECT_FORM_REQUESTED, data: { project_id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({
        type: EDIT_PROJECT_REQUESTED,
        data: _.assign(form.value, { id: store.getState().Project.edit.item.id })
      });
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
