import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import store from './../../../../store/store.module';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FETCH_CUSTOMER_DETAIL_REQUESTED } from '../edit.actions';
import { MultiSearchAction } from '../../../../models/MultiSearchAction';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public store = store;
  public navigationSubscription: Subscription;

  public search_actions = _.map(
    [
      {
        label: 'keyword',
        placeholder: 'Search by product name'
      }
    ],
    action => new MultiSearchAction(action)
  );

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_CUSTOMER_DETAIL_REQUESTED, data: this.activatedRoute.parent.snapshot.params.id });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
