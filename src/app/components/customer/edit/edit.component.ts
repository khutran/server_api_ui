import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../../common/services/notification/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
import {
  CREATE_CUSTOMER_ADDRESS_REQUESTED,
  UPDATE_CUSTOMER_REQUESTED,
  FETCH_CUSTOMER_DETAIL_REQUESTED,
  FETCH_CUSTOMER_ADDRESSES_REQUESTED,
  DELETE_CUSTOMER_ADDRESS_REQUESTED,
  UPDATE_CUSTOMER_ADDRESS_REQUESTED,
  SET_DEFAULT_ADDRESS_REQUESTED,
  DELETE_CUSTOMER_REQUESTED
} from './edit.actions';
import * as _ from 'lodash';
import { CUSTOMER_COMP } from '../customer.const';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public store = store;
  public navigationSubscription: Subscription;
  public tabItems = {
    customer_view: false,
    account_info: false,
    addresses: false,
    orders: false,
    cart: false,
    wishlist: false,
    newsletter: false,
    offers_received: false,
    offers_made: false
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.tabItems.customer_view = this.router.isActive('/customer/edit/2/customer-view', true);
        this.tabItems.account_info = this.router.isActive('/customer/edit/2/account-info', true);
        this.tabItems.addresses = this.router.isActive('/customer/edit/2/addresses', true);
        this.tabItems.orders = this.router.isActive('/customer/edit/2/orders', true);
        this.tabItems.cart = this.router.isActive('/customer/edit/2/cart', true);
        this.tabItems.wishlist = this.router.isActive('/customer/edit/2/wishlist', true);
        this.tabItems.newsletter = this.router.isActive('/customer/edit/2/newsletter', true);
        this.tabItems.offers_received = this.router.isActive('/customer/edit/2/offers_received', true);
        this.tabItems.offers_made = this.router.isActive('/customer/edit/2/offers_made', true);
      }
    });
  }

  ngOnInit() {
    const path = this.router.url;
    const routeName = _.split('/', path);
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getItemId() {
    return this.activatedRoute.snapshot.params.id;
  }

  setDefault(address) {
    store.dispatch({ type: SET_DEFAULT_ADDRESS_REQUESTED, data: { id: address.id, is_default: 1 } });
  }
}
