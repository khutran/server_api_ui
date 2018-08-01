import { FETCH_ALL_ROLE_REQUESTED } from './../../acl/roles/roles.actions';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NotificationService } from './../../../common/services/notification/notification.service';
import { USER_COMP } from './../user.const';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import { CREATE_USER_REQUESTED } from './create.actions';
import { UtilityService } from '../../../common/services/utility/utility.service';
import * as _ from 'lodash';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  public store;
  protected navigationSupscription: Subscription;
  public user = {
    email: '',
    password: '',
    re_password: '',
    first_name: '',
    last_name: '',
    status: 0,
    role_id: ''
  };
  public redirectData;
  constructor(private notification: NotificationService, private activatedRoute: ActivatedRoute, private router: Router, private utilityService: UtilityService) {
    this.store = AppInjector.get(Store).getInstance();
    this.navigationSupscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({
          type: FETCH_ALL_ROLE_REQUESTED,
          com: USER_COMP
        });
      }
    });
  }

  ngOnInit() {
    this.redirectData = this.utilityService.getRedirectData();
    if (this.redirectData.defaultValue) {
      this.user = Object.keys(this.redirectData.defaultValue).reduce((prevValue, currentValue) => {
        prevValue[currentValue] = this.redirectData.defaultValue[currentValue];
        return prevValue;
      }, this.user);
    }
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSupscription)) {
      this.navigationSupscription.unsubscribe();
    }
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({
        type: CREATE_USER_REQUESTED,
        data: this.user,
        com: USER_COMP,
        redirect: this.redirectData.page
      });
    }
  }
}
