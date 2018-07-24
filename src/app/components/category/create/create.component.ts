import { FETCH_CATEGORIES_REQUESTED } from './../list/list.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { CREATE_CATEGORY_REQUESTED } from './create.actions';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;

  public category = {
    id: 0,
    name: '',
    parent_id: ''
  };

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED });
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({ type: CREATE_CATEGORY_REQUESTED, data: this.category });
    }
  }
}
