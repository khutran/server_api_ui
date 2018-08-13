import { Component, OnInit } from '@angular/core';
import { CREATE_ROLE_REQUESTED } from './create.actions';
import { Store } from '../../../../store/store.module';
import { AppInjector } from '../../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;

  public role = {
    name: '',
    level: 1
  };

  constructor(store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      store.dispatch({ type: CREATE_ROLE_REQUESTED, data: this.role });
    }
  }
}
