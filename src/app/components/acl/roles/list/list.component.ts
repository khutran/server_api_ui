import { ROLE_COMP } from './../roles.const';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import store from './../../../../store/store.module';
import { FETCH_ALL_ROLE_REQUESTED } from '../roles.actions';
import * as _ from 'lodash';
import { DELETE_ROLE_REQUESTED } from './list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public store = store;
  public navigationSubscription: Subscription;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private route: Router) {
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_ALL_ROLE_REQUESTED, com: ROLE_COMP });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  removeRole(item) {
    store.dispatch({
      type: DELETE_ROLE_REQUESTED,
      data: item
    });
  }
}
