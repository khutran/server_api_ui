import { DELETE_PROVIDER_REQUESTED } from './../edit/edit.actions';
import { FETCH_PROVIDERS_REQUESTED, SORT_PROVIDERS_REQUESTED } from './list.actions';
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
  navigationSubscription: any;
  protected router: any;
  public store = store;
  public page = 1;
  public limit = 100;
  public pagesToShow = 3;
  public selectAll;

  public orders = {
    id: null,
    name: null
  };

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_PROVIDERS_REQUESTED, data: this.getQuery() });
      }
    });
  }

  ngOnInit() {
    store.dispatch({ type: FETCH_PROVIDERS_REQUESTED });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  goToPage(n: number): void {
    this.page = n;
    store.dispatch({ type: FETCH_PROVIDERS_REQUESTED, data: this.getQuery() });
  }

  onNext(): void {
    this.page++;
    store.dispatch({ type: FETCH_PROVIDERS_REQUESTED, data: this.getQuery() });
  }

  onPrev(): void {
    this.page--;
    store.dispatch({ type: FETCH_PROVIDERS_REQUESTED, data: this.getQuery() });
  }

  updateLimit(limit) {
    store.dispatch({ type: FETCH_PROVIDERS_REQUESTED, data: this.getQuery() });
  }

  private getQuery(): object {
    let page = 1;
    let per_page = this.limit;
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.page)) {
      page = this.activeRouter.snapshot.queryParams.page;
    }
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.per_page)) {
      per_page = this.activeRouter.snapshot.queryParams.per_page;
    }
    return _.assign({}, { page: page, per_page });
  }

  sortBy(field) {
    // tslint:disable-next-line:forin
    let query = [];
    for (const prop in this.orders) {
      if (prop === field) {
        if (this.orders[field] === null) {
          this.orders[field] = '-';
        } else {
          this.orders[field] = this.orders[field] === '-' ? '' : '-';
        }
      }
    }
    store.dispatch({ type: SORT_PROVIDERS_REQUESTED, data: this.orders });
  }

  deleteItem(id) {
    if (confirm('Do you want to delete this provider?')) {
      store.dispatch({ type: DELETE_PROVIDER_REQUESTED, data: id });
    }
  }
}
