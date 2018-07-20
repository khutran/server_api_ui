import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';
import { CREATE_PRODUCT_REQUESTED } from './create.actions';
import * as _ from 'lodash';
import { FETCH_CATEGORIES_REQUESTED } from '../../category/list/list.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store = store;

  public product = {
    name: '',
    sku: '',
    description: '',
    images: '',
    price: '',
    original_price: '',
    category_id: '',
    designer_id: '',
    size_id: '',
    style_id: '',
    condition_id: '',
    process_status_id: '',
    process_type_id: '',
    collection_id: '',
    shoesize: '',
    heel_height: '',
    dimensions: '',
    kidz_size: '',
    kidz_shoes: '',
    color: '',
    material: ''
  };

  constructor() {}

  ngOnInit() {
    store.dispatch({ type: FETCH_CATEGORIES_REQUESTED });
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: CREATE_PRODUCT_REQUESTED, data: this.product, redirect: 'product' });
    }
  }
}
