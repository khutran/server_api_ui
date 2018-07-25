import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { FORGOT_PASSWORD_REQUESTED } from './forgot-password.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public store;
  public email = '';

  constructor(private notification: NotificationService) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.email === '') {
      this.notification.show('warning', 'Email is required', 3000);
      return false;
    }

    let data = {
      email: this.email
    };
    this.store.dispatch({ type: FORGOT_PASSWORD_REQUESTED, data: data });
  }
}
