import { CUSTOMER_COMP } from './../customer.const';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';
import { CREATE_CUSTOMER_REQUESTED } from './create.actions';
import * as _ from 'lodash';
import { CREATE_CUSTOMER_ADDRESS_REQUESTED, FETCH_CUSTOMER_ADDRESSES_REQUESTED } from '../edit/edit.actions';
import { FETCH_ALL_CUSTOMER_GROUP_REQUESTED } from '../customer.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store = store;

  public addNewAdd = false;
  public filter;

  public customer = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    group: '',
    default_address_id: null,
    role_id: 2,
    type: 'VIP',
    password: '',
    re_password: '',
    whitegloveverify: ''
  };

  constructor() {}

  ngOnInit() {
    store.dispatch({
      type: FETCH_ALL_CUSTOMER_GROUP_REQUESTED,
      com: CUSTOMER_COMP
    });
  }

  onSubmit(form) {
    // console.log(this.customer);
    if (form.valid) {
      store.dispatch({
        type: CREATE_CUSTOMER_REQUESTED,
        data: _.assign({}, this.customer)
      });
    }
  }

  openNewAddressForm() {
    this.addNewAdd = !this.addNewAdd;
  }
}
