import { Subscription } from 'rxjs/Subscription';
import { DELETE_ORDER_REQUESTED } from './../edit/edit.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
import { FETCH_ORDERS_REQUESTED, SORT_ORDERS_REQUESTED } from './list.actions';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  UPDATE_ORDER_FILTER
} from './list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public navigationSubscription: Subscription;
  public store = store;

  public UPDATE_ORDER_FILTER = UPDATE_ORDER_FILTER;

  public search_actions = [
    {
      label: 'Product SKU',
      placeholder: 'Search by Order ID'
    },
    {
      label: 'Keyword',
      placeholder: 'Search by product name'
    }
  ];

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private router: Router) {
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({
          type: FETCH_ORDERS_REQUESTED,
          data: {
            pagination: this.getQuery()
          }
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

  public getQuery(): object {
    let supportedParams = ['sort', 'constraints', 'page', 'per_page', 'search', 'skus'];
    let queryParams = { page: 1 };
    if (_.keys(this.activeRouter.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activeRouter.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }
}
