import { DELETE_CATEGORY_REQUESTED } from './../edit/edit.actions';
import { FETCH_CATEGORIES_REQUESTED, FETCH_NESTED_CATEGORIES_REQUESTED, SORT_CATEGORIES_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import * as _ from 'lodash';
import { CREATE_CATEGORY_REQUESTED } from '../create/create.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  navigationSubscription: any;
  protected router: any;
  public store;
  public page = 1;
  public limit = 100;
  public pagesToShow = 3;
  public selectAll;

  public orders = {
    id: null,
    name: null
  };

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED, data: this.getQuery() });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED });
    this.store.dispatch({ type: FETCH_NESTED_CATEGORIES_REQUESTED, data: 1 });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }
  goToPage(n: number): void {
    this.page = n;
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED, data: this.getQuery() });
  }

  onNext(): void {
    this.page++;
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED, data: this.getQuery() });
  }

  onPrev(): void {
    this.page--;
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED, data: this.getQuery() });
  }

  updateLimit() {
    // console.log(this.limit);
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED, data: this.getQuery() });
  }

  deleteItem(id) {
    if (confirm('Do you want to delete this category?')) {
      this.store.dispatch({ type: DELETE_CATEGORY_REQUESTED, data: id });
    }
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
    this.store.dispatch({ type: SORT_CATEGORIES_REQUESTED, data: this.orders });
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
}
