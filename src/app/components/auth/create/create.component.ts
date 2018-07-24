import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { CREATE_USER_REQUESTED } from './create.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;
  public user = {
    email: '',
    password: '',
    re_password: '',
    first_name: '',
    last_name: ''
  };

  constructor(private notification: NotificationService) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.user.password !== this.user.re_password) {
      this.notification.show('warning', 'Password does not match', 3000);
    }

    let data = {
      email: this.user.email,
      password: this.user.password,
      first_name: this.user.first_name,
      last_name: this.user.last_name
    };
    this.store.dispatch({ type: CREATE_USER_REQUESTED, data: data });
  }
}
