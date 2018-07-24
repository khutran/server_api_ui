import { DELETE_PROJECT_REQUESTED } from './../edit/edit.actions';
import { FETCH_PROJECTS_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
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
  private store = store;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_PROJECTS_REQUESTED, data: this.getQuery() });
      }
    });
  }

  ngOnInit() {
    store.dispatch({ type: FETCH_PROJECTS_REQUESTED });
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
    if (confirm('Do you want to delete this project?')) {
      store.dispatch({ type: DELETE_PROJECT_REQUESTED, data: id });
    }
  }
}
