import { DELETE_PROJECT_REQUESTED } from './../edit/edit.actions';
import { FETCH_PROJECTS_REQUESTED, BUILD_PROJECT_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected navigationSubscription: any;
  protected router: any;
  public store;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_PROJECTS_REQUESTED, data: this.parseQuery() });
      }
    });
  }

  ngOnInit() {
    // this.store.dispatch({ type: FETCH_PROJECTS_REQUESTED });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private parseQuery(): object {
    let params = {
      page: 1,
      per_page: 20
    };
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.page)) {
      params = _.assign(params, { page: this.activeRouter.snapshot.queryParams.page });
    }
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.search)) {
      params = _.assign(params, { search: this.activeRouter.snapshot.queryParams.search });
    }
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.order_by)) {
      params = _.assign(params, { orderBy: this.activeRouter.snapshot.queryParams.order_by });
    }
    return params;
  }

  deleteItem(id) {
    this.store.dispatch({ type: DELETE_PROJECT_REQUESTED, data: id });
  }

  buildItem(id) {
    this.store.dispatch({ type: BUILD_PROJECT_REQUESTED, data: id });
  }
}
