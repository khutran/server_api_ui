import { CUSTOMER_COMP } from './../../customer.const';
import { FETCH_ALL_CUSTOMER_GROUP_REQUESTED } from './../../customer.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import store from './../../../../store/store.module';
import { FETCH_CUSTOMER_DETAIL_REQUESTED, DELETE_CUSTOMER_REQUESTED, UPDATE_CUSTOMER_REQUESTED } from '../edit.actions';
import * as _ from 'lodash';

@Component({
	selector: 'app-account-info',
	templateUrl: './account-info.component.html',
	styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
	public store = store;
	public navigationSubscription: Subscription;

	test = 'duy';
	my_phone = '0123';

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				store.dispatch({ type: FETCH_CUSTOMER_DETAIL_REQUESTED, data: this.activatedRoute.parent.snapshot.params.id });
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

	deleteCustomer(customer) {
		store.dispatch({
			type: DELETE_CUSTOMER_REQUESTED,
			data: customer.getId(),
			com: CUSTOMER_COMP
		});
	}

	onSubmit(form) {
		if (form.valid) {
			store.dispatch({
				type: UPDATE_CUSTOMER_REQUESTED,
				data: _.assign(_.clone((store as any).getState().Customer.edit.item.customer), {
					id: this.activatedRoute.parent.snapshot.params.id
				})
			});
		}
	}
}
