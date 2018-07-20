import { ADDRESSES_COMP } from './addresses.const';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import store from './../../../../store/store.module';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  FETCH_CUSTOMER_DETAIL_REQUESTED,
  CREATE_CUSTOMER_ADDRESS_REQUESTED,
  DELETE_CUSTOMER_ADDRESS_REQUESTED,
  UPDATE_CUSTOMER_ADDRESS_REQUESTED,
  SET_DEFAULT_ADDRESS_REQUESTED,
  FETCH_CUSTOMER_ADDRESSES_REQUESTED
} from '../edit.actions';
import { SET_DEFAULT_BILLING_ADDRESS_REQUESTED } from './addresses.actions';
import { Countries } from './countries';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  public store = store;
  public navigationSubscription: Subscription;
  public createNew = false;
  public isUpdate = false;
  public address = {
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
    first_name: '',
    last_name: ''
  };
  public COUNTRIES = Countries;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({
          type: FETCH_CUSTOMER_ADDRESSES_REQUESTED,
          data: {
            pagination: this.getQuery(),
            filter: { customer_id: this.activatedRoute.parent.snapshot.params.id }
          }
        });
        store.dispatch({
          type: FETCH_CUSTOMER_DETAIL_REQUESTED,
          data: this.activatedRoute.parent.snapshot.params.id
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
    let supportedParams = ['sort', 'constraints', 'page', 'search', 'email'];
    let queryParams = { page: 1 };
    if (_.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activatedRoute.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }

  setDefaultBilling(address) {
    store.dispatch({
      type: SET_DEFAULT_BILLING_ADDRESS_REQUESTED,
      data: {
        user_id: this.activatedRoute.parent.snapshot.params.id,
        address_id: address.getId(),
        type: 'billing',
        is_default: !address.is_default_billing
      },
      com: ADDRESSES_COMP
    });
  }

  setDefaultAddress(address) {
    store.dispatch({
      type: SET_DEFAULT_ADDRESS_REQUESTED,
      data: {
        user_id: this.activatedRoute.parent.snapshot.params.id,
        address_id: address.getId(),
        type: 'address',
        is_default: !address.is_default
      }
    });
  }

  addAddress(form) {
    if (form.valid) {
      this.createNew = !this.createNew;
      store.dispatch({
        type: CREATE_CUSTOMER_ADDRESS_REQUESTED,
        data: _.assign({}, this.address, {
          customer_id: (store as any).getState().Customer.edit.item.getId(),
          user_id: this.activatedRoute.parent.snapshot.params.id
        })
      });
    }
  }

  deleteAddress(address) {
    store.dispatch({
      type: DELETE_CUSTOMER_ADDRESS_REQUESTED,
      data: _.assign({}, address, {
        customer_id: (store as any).getState().Customer.edit.item.getId(),
        user_id: this.activatedRoute.parent.snapshot.params.id
      })
    });
  }

  openCreateAddressForm() {
    this.address = {
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      phone: '',
      first_name: '',
      last_name: ''
    };
    this.createNew = !this.createNew;
    this.isUpdate = false;
  }

  editAddress(address) {
    this.address = address;
    this.createNew = !this.createNew;
    this.isUpdate = true;
  }

  updateAddress(form) {
    if (form.valid) {
      store.dispatch({
        type: UPDATE_CUSTOMER_ADDRESS_REQUESTED,
		data: this.address,
		userId: this.activatedRoute.parent.snapshot.params.id
      });
      this.createNew = !this.createNew;
    }
  }
}
