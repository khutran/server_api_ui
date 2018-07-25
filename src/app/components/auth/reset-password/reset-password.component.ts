import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { RESET_PASSWORD_REQUESTED } from './reset-password.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as _ from 'lodash';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public store;
  public user = {
    password: '',
    re_password: ''
  };

  constructor(private notification: NotificationService, private route: ActivatedRoute) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      let token = params.token;

      if (_.isEmpty(params)) {
        this.notification.show('warning', 'Token is invalid', 3000);
        return false;
      }

      if (this.user.password === '' || this.user.re_password === '') {
        this.notification.show('warning', 'Password is required', 3000);
        return false;
      }

      if (this.user.password !== this.user.re_password) {
        this.notification.show('warning', 'Password does not match', 3000);
        return false;
      }

      let data = {
        password: this.user.password,
        reset_token: token
      };
      this.store.dispatch({ type: RESET_PASSWORD_REQUESTED, data: data });
    });
  }
}
