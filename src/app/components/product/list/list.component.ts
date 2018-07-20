import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
import {
  FETCH_PRODUCTS_REQUESTED,
  SELECT_ALL_PRODUCT,
  BROADCAST_ITEM_REQUESTED,
  UPDATE_PRODUCT_STATUS_REQUESTED
} from './list.actions';
import * as _ from 'lodash';
import { FETCH_DESIGNERS_REQUESTED } from '../../designer/list/list.actions';
import { PRINT_REQUEST } from '../../../store/print/print.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UtilityService } from '../../../common/services/utility/utility.service';
import { BarcodeComponent } from '../../../common/print-template/product-barcode/barcode.component';
import { MultiSearchAction } from '../../../models/MultiSearchAction';
import { Subscription } from 'rxjs/Subscription';
import { PRODUCT_STATUS_PENDING, PRODUCT_STATUS_SELLING, PRODUCT_STATUS_SOLD, PRODUCT_STATUS_CANCELED } from '../product.const';

declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public store = store;

  private filters = {};
  protected defaultFilters = {
    size_group_id: '',
    enabled: '',
    condition: '',
    designer: '',
    process_status: '',
    style: '',
    category: '',
    size_gender: '',
    size_age_group: '',
    process_type: ''
  };
  protected defaultOrders = {
    sku: null,
    enabled: null,
    id: null,
    name: null,
    price: null,
    condition: null,
    designer: null,
    size: null,
    color: null,
    process_status: null,
    updated_at: '-'
  };
  public filterOrderUntouched = true;
  public temporaryFilterHolder = { ...this.defaultFilters };
  protected orders = { ...this.defaultOrders };

  public search_actions = _.map(
    [
      {
        label: 'Keyword',
        placeholder: 'Search by product name'
      },
      {
        label: 'Seller Email',
        queryParamKey: 'seller_email',
        placeholder: 'Search by product seller email'
      },
      {
        label: 'Collection Number',
        queryParamKey: 'collection_id',
        placeholder: 'Search by collection number'
      }
    ],
    action => new MultiSearchAction(action)
  );

  public status = [
    {
      label: 'Pending',
      value: PRODUCT_STATUS_PENDING
    },
    {
      label: 'Selling',
      value: PRODUCT_STATUS_SELLING
    },
    {
      label: 'Sold',
      value: PRODUCT_STATUS_SOLD
    },
    {
      label: 'Canceled',
      value: PRODUCT_STATUS_CANCELED
    }
  ];

  public navigationSubscription: Subscription;

  constructor(private notification: NotificationService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        store.dispatch({
          type: FETCH_PRODUCTS_REQUESTED,
          data: {
            filter: this.filters,
            sort: this.orders,
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

  changeProductStatus(item) {
    store.dispatch({ type: UPDATE_PRODUCT_STATUS_REQUESTED, data: item });
  }

  public getQuery(): object {
    let supportedParams = ['sort', 'constraints', 'page', 'per_page', 'search', 'skus'];
    let queryParams = { page: 1 };
    if (_.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activatedRoute.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }

  selectItem(item) {
    item.selected = true;
  }

  selectAll(isSelect) {
    store.dispatch({ type: SELECT_ALL_PRODUCT, selected: isSelect });
  }
  broadcast(item) {
    store.dispatch({ type: BROADCAST_ITEM_REQUESTED, data: item });
  }
}
