import { DELETE_<%= name.toUpperCase() %>_REQUESTED } from './../edit/edit.actions';
import { FETCH_<%= name.toUpperCase() %>S_REQUESTED, SORT_<%= name.toUpperCase() %>S_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.<%= styleext %>']
})
export class ListComponent implements OnInit, OnDestroy {
  protected navigationSubscription: any;
  protected router: any;
  private store;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED, data: this.getQuery() });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private getQuery(): object {
    let page = 1;
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.page)) {
      page = this.activeRouter.snapshot.queryParams.page;
    }
    return _.assign({}, { page: page });
  }

  deleteItem(id) {
    if (confirm('Do you want to delete this <%= underscore(name).replace("_", "")  %>?')) {
      this.store.dispatch({ type: DELETE_<%= underscore(name).toUpperCase() %>_REQUESTED, data: id });
    }
  }
}
