import { DELETE_FRAMEWORK_REQUESTED } from './../edit/edit.actions';
import { FETCH_FRAMEWORKS_REQUESTED, SORT_FRAMEWORKS_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected navigationSubscription: any;
  protected router: any;
  public store;

  constructor(store: Store, private notification: NotificationService, private activedRoute: ActivatedRoute, router: Router) {
    this.store = store.getInstance();
    this.activedRoute = activedRoute;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_FRAMEWORKS_REQUESTED, data: this.parseQueryParams() });
      }
    });
  }

  ngOnInit() {
    // this.store.dispatch({ type: FETCH_FRAMEWORKS_REQUESTED });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private parseQueryParams(): object {
    let params = {
      page: 1,
      per_page: 20
    };
    if (!_.isUndefined(this.activedRoute.snapshot.queryParams.page)) {
      params = _.assign(params, { page: this.activedRoute.snapshot.queryParams.page });
    }
    if (!_.isUndefined(this.activedRoute.snapshot.queryParams.search)) {
      params = _.assign(params, { search: this.activedRoute.snapshot.queryParams.search });
    }
    if (!_.isUndefined(this.activedRoute.snapshot.queryParams.order_by)) {
      params = _.assign(params, { orderBy: this.activedRoute.snapshot.queryParams.order_by });
    }
    return params;
  }

  delete(id) {
      this.store.dispatch({ type: DELETE_FRAMEWORK_REQUESTED, data: id });
  }
}
