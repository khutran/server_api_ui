import { ROLE_COMP } from './../roles.const';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FETCH_ALL_ROLE_REQUESTED } from '../roles.actions';
import * as _ from 'lodash';
import { DELETE_ROLE_REQUESTED } from './list.actions';
import { Store } from '../../../../store/store.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public store;
  public navigationSubscription: Subscription;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private route: Router, store: Store) {
    this.store = store.getInstance();
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_ALL_ROLE_REQUESTED, com: ROLE_COMP });
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
    this.store.dispatch({
      type: DELETE_ROLE_REQUESTED,
      data: item
    });
  }
}
