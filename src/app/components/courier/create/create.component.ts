import { CREATE_COURIER_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public store = store;
  public courier = {
    name: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: CREATE_COURIER_REQUESTED, data: this.courier });
    }
  }

}
