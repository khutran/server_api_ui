import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from './../../../store/store.module';
import { FETCH_ALL_USER_REQUESTED, DELETE_USER_REQUESTED } from './list.actions';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public store;
  public navigationSubscription: Subscription;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private route: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({
          type: FETCH_ALL_USER_REQUESTED,
          data: this.getQuery(),
          com: USER_COMP
        });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  removeUser(item) {
    if (!_.isUndefined(item)) {
      this.store.dispatch({
        type: DELETE_USER_REQUESTED,
        data: item.getId(),
        com: USER_COMP
      });
    }
  }

  public getQuery(): object {
    let limit = 100;
    let supportedParams = ['sort', 'constraints', 'page', 'search'];
    let queryParams = { sort: '-created_at' };
    if (_.keys(this.activeRouter.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activeRouter.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }
}
