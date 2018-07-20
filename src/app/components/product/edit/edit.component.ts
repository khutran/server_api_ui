import { GET_ALL_DESIGNERS_REQUESTED } from '../../designer/designer.actions';
import { GET_ALL_CATEGORIES_REQUESTED } from '../../category/category.actions';
import { GET_ALL_PROVIDERS_REQUESTED } from '../../provider/provider.actions';
import { GET_ALL_CURRENCYS_REQUESTED } from '../../currency/currency.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';
import { FETCH_PRODUCT_DETAIL_REQUESTED } from '../detail/detail.actions';
import { UPDATE_PRODUCT_REQUESTED, DELETE_PRODUCT_REQUESTED } from './edit.actions';
import ArrayList from '../../../models/ArrayList';
import { UtilityService } from '../../../common/services/utility/utility.service';
import { FILTER_USERS_REQUESTED } from '../../user/list/list.actions';
import { PRODUCT_COMP } from '../product.const';
import { Subject } from 'rxjs/Subject';
import { tap, debounceTime } from 'rxjs/operators';
import Redirect from '../../../models/Redirect';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public store = store;
  private state = <any>store.getState();
  public utilityService;
  public mainCurrency;
  public categoryModel = {
    type_code: null,
    main_code: null
  };
  public emptyproduct = {
    sku: '',
    price: 0,
    process_status_id: null,
    process_type_id: null,
    provider_id: null,
    name: '',
    categories: [],
    designer_id: null,
    id: '',
    condition_id: null,
    currency_id: null,
    styles: [],
    size_id: null,
    heel_height: '',
    dimensions: '',
    color: '',
    material: '',
    description: '',
    original_price: 0,
    seller_id: null
  };
  public product = { ...this.emptyproduct };
  public redirectData;
  public userSubject = new Subject<string>();
  constructor(private router: Router, private route: ActivatedRoute, utilityService: UtilityService) {
    this.utilityService = utilityService;
  }

  ngOnInit() {
    store.dispatch({ type: FETCH_PRODUCT_DETAIL_REQUESTED, data: this.getProductId() });
    this.product = { ...this.emptyproduct };
    this.redirectData = this.utilityService.getRedirectData();
    let subscribeProduct = store.subscribe(() => {
      if ((store as any).getState().Product.detail.fetched) {
        let newVal = (store as any).getState().Product.detail.data;
        Object.keys(this.product).forEach(attrKey => {
          if (newVal[attrKey] instanceof ArrayList) {
            this.product[attrKey] = newVal[attrKey] ? newVal[attrKey].getId() : '';
          } else {
            this.product[attrKey] = newVal[attrKey] ? newVal[attrKey] : '';
          }
        });
        if (newVal.user) {
          this.userSubject.next();
        }
        subscribeProduct();
      }
    });
    store.subscribe(() => {
      this.checkCategory();
      this.checkCurrency();
    });
    this.subscribeToUser();
  }

  checkCategory() {
    if ((store as any).getState().Category.all.fetched) {
      let allCategories = (store as any).getState().Category.all.items;
      if (this.product.categories.length > 0) {
        if (this.product.categories[0]) {
          // tslint:disable-next-line:radix
          this.categoryModel = allCategories.find(s => parseInt(this.product.categories[0]) === s.id);
        }
      }
    }
  }

  checkCurrency() {
    if ((store as any).getState().Currency.all.fetched) {
      let allCurrencies = (store as any).getState().Currency.all.items;
      this.mainCurrency = allCurrencies.find(s => s.base);
    }
  }

  getProductId() {
    let productId = this.route.snapshot.paramMap.get('id');
    return productId;
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: UPDATE_PRODUCT_REQUESTED, data: this.product, redirect: this.utilityService.getRedirectData().page });
    }
  }

  parseInt(val) {
    // tslint:disable-next-line:radix
    return val ? parseInt(val) : '';
  }

  deleteItem(id) {
    if (confirm('Do you want to delete this product?')) {
      store.dispatch({ type: DELETE_PRODUCT_REQUESTED, data: id });
    }
  }

  newUser(terms) {
    this.utilityService.nextPageWithReferer(
      ['/user/create'],
      new Redirect(this.router.url, {
        email: terms
      })
    );
  }

  subscribeToUser() {
    this.userSubject.pipe(debounceTime(500)).subscribe(
      term => {
        if (term) {
          store.dispatch({ type: FILTER_USERS_REQUESTED, com: PRODUCT_COMP, data: { pagination: { page: 1, per_page: 10 }, sort: null, filter: null, search: term } });
        } else {
          if ((store as any).getState().Product.detail.data.user.email) {
            store.dispatch({
              type: FILTER_USERS_REQUESTED,
              com: PRODUCT_COMP,
              data: { pagination: { page: 1, per_page: 10 }, sort: null, filter: null, search: (store as any).getState().Product.detail.data.user.email }
            });
          } else {
            store.dispatch({ type: FILTER_USERS_REQUESTED, com: PRODUCT_COMP, data: { pagination: { page: 1, per_page: 10 }, sort: null, filter: null, search: null } });
          }
        }
      },
      () => {}
    );
  }
}
