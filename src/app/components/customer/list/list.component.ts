import { CUSTOMER_COMP } from './../customer.const';
import { FETCH_ALL_CUSTOMER_GROUP_REQUESTED } from './../customer.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
import * as _ from 'lodash';
import { FETCH_CUSTOMERS_REQUESTED, SORT_CUSTOMERS_REQUESTED } from './list.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MultiSearchAction } from '../../../models/MultiSearchAction';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
	protected navigationSubscription: any;
	public store = store;
	public filter;

	public search_actions = _.map(
		[
			{
				label: 'Email',
				placeholder: 'Search by customer email'
			}
		],
		action => new MultiSearchAction(action)
	);

	constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				store.dispatch({
					type: FETCH_CUSTOMERS_REQUESTED,
					data: _.assign({}, this.getQuery(), {
						roles: 'customer'
					})
				});
				store.dispatch({ type: FETCH_ALL_CUSTOMER_GROUP_REQUESTED, com: CUSTOMER_COMP });
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
		if (_.keys(this.activeRouter.snapshot.queryParams).length > 0) {
			queryParams = _.assign(queryParams, this.activeRouter.snapshot.queryParams);
		}
		return _.pick(queryParams, supportedParams);
	}
}
