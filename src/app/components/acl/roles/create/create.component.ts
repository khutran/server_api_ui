import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import store from './../../../../store/store.module';
import { CREATE_ROLE_REQUESTED } from './create.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public store = store;

  public role = {
    name: '',
    level: 1,
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: CREATE_ROLE_REQUESTED, data: this.role });
    }
  }

}
