import { EDIT_PROJECT_REQUESTED, RENDER_EDIT_PROJECT_FORM_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { Radio } from '../../../common/directives/dynamic-form/Input/Radio';
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
        key: 'git_remote',
        label: 'Git Remote',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      }),
      new TextBox({
        key: 'git_branch',
        label: 'Git Branch',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      }),
      new TextBox({
        key: 'git_app_key',
        label: 'Git Application Key',
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new TextBox({
        key: 'git_app_secret',
        label: 'Git Application Secret',
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      }),
      new Radio({
        key: 'build_automatically',
        label: '',
        classes: ['col'],
        group_classes: ['col-12'],
        style: 'inline',
        options: [
          {
            key: 'Build Project Automatically',
            value: 'yes'
          },
          {
            key: 'No',
            value: 'no'
          }
        ],
        order: 5
      }),
      new Radio({
        key: 'backup_automatically',
        label: '',
        classes: ['col'],
        group_classes: ['col-12'],
        style: 'inline',
        options: [
          {
            key: 'Backup Project Automatically',
            value: 'yes'
          },
          {
            key: 'No',
            value: 'no'
          }
        ],
        order: 5
      })
    ];
    this.store.dispatch({ type: RENDER_EDIT_PROJECT_FORM_REQUESTED, data: { project_id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({ type: EDIT_PROJECT_REQUESTED, data: this.store.getState().Project.edit.item });
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
