import { CREATE_PROVIDER_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public store = store;
  public provider = {
    name: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: CREATE_PROVIDER_REQUESTED, data: this.provider });
    }
  }

}
