import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as _ from 'lodash';
import { AuthComponent } from '../auth.component';
import store from './../../../store/store.module';
import { LOGIN_REQUESTED } from './login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent implements OnInit {
  public store = store;
  public redirectUrl = 'product';
  user = {
    email: '',
    password: ''
  };
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private notification: NotificationService) {
    super();
    _activatedRoute.queryParams.subscribe(params => {
      if (!_.isUndefined(params.url)) {
        this.redirectUrl = params.url;
      }
    });
  }

  ngOnInit() {}

  onSubmit() {
    let data = {
      email: this.user.email,
      password: this.user.password
    };
    store.dispatch({ type: LOGIN_REQUESTED, data: data });
  }
}
