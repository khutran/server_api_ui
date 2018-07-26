import { CREATE_SERVER_REQUESTED } from './create.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public store;
  private server = {
    name: ''
  };

  constructor(store: Store) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({ type: CREATE_SERVER_REQUESTED, data: this.server });
    }
  }

}