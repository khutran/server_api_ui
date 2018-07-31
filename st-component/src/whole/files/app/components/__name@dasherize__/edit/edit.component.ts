import * as _ from 'lodash';
import { EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED, RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED } from './edit.actions';
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
      }),
      new TextBox({
        key: 'email',
        label: 'Eamil',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 2
      })
    ];
    this.store.dispatch({ type: RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED, data: { id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({
        type: EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED,
        data: _.assign(form.value, { id: store.getState().<%= classify(name) %>.edit.item.id })
      });
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
