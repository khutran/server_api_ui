import { CUSTOMER_COMP } from './../../customer.const';
import { FETCH_ORDERS_REQUESTED } from './../../../order/list/list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import store from './../../../../store/store.module';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FETCH_CUSTOMER_DETAIL_REQUESTED } from '../edit.actions';
import { MultiSearchAction } from '../../../../models/MultiSearchAction';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public store = store;
  public navigationSubscription: Subscription;

  public search_actions = _.map(
    [
      {
        label: 'Billing Name',
        placeholder: 'Search by billing name'
      },
      {
        label: 'Shipping Name',
        placeholder: 'Search by shipping name'
      }
    ],
    action => new MultiSearchAction(action)
  );

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_CUSTOMER_DETAIL_REQUESTED, data: this.activatedRoute.parent.snapshot.params.id });
        store.dispatch({
          type: FETCH_ORDERS_REQUESTED,
          com: CUSTOMER_COMP,
          data: {
            pagination: this.getQuery(),
            sorts: null,
            filters: {
              user_id: this.activatedRoute.parent.snapshot.params.id
            }
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
    let supportedParams = ['sort', 'constraints', 'page', 'search'];
    let queryParams = { page: 1 };
    if (_.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activatedRoute.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }
}
