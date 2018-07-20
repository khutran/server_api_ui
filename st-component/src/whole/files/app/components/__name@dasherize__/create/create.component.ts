import { CREATE_<%= underscore(name).toUpperCase() %>_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.<%= styleext %>']
})
export class CreateComponent implements OnInit {

  private store = store;
  private <%= camelize(name) %> = {
    name: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: CREATE_<%= underscore(name).toUpperCase() %>_REQUESTED, data: this.<%= camelize(name) %> });
    }
  }

}
