import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FETCH_CUSTOMER_DETAIL_REQUESTED } from '../edit.actions';
import { Subscription } from 'rxjs/Subscription';
import store from './../../../../store/store.module';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit, OnDestroy {

  public store = store;
  public navigationSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({ type: FETCH_CUSTOMER_DETAIL_REQUESTED, data: this.activatedRoute.parent.snapshot.params.id });
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
