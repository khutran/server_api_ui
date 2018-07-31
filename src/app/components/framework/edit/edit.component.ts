import * as _ from 'lodash';
import { EDIT_FRAMEWORK_REQUESTED, RENDER_EDIT_FRAMEWORK_FORM_REQUESTED } from './edit.actions';
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
        label: 'Name',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      })
    ];
    this.store.dispatch({ type: RENDER_EDIT_FRAMEWORK_FORM_REQUESTED, data: { id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({
        type: EDIT_FRAMEWORK_REQUESTED,
        data: _.assign(form.value, { id: store.getState().Framework.edit.item.id })
      });
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
