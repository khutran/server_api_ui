import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { RENDER_CREATE_CATEGORY_FORM_REQUESTED, CREATE_CATEGORY_REQUESTED } from './create.actions';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;

  constructor(public activatedRoute: ActivatedRoute, store: Store) {
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
      })
    ];
    this.store.dispatch({ type: RENDER_CREATE_CATEGORY_FORM_REQUESTED, data: { inputs: inputs } });
  }

  onSubmit(form) {
    if (form.valid) {
      const store = AppInjector.get(Store).getInstance();
      store.dispatch({ type: CREATE_CATEGORY_REQUESTED, data: form.value });
    }
  }
}
