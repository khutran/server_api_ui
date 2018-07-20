import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { UPDATE_ORDER_REQUESTED, DELETE_ORDER_REQUESTED } from './edit.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import store from './../../../store/store.module';
import { FETCH_ORDER_DETAIL_REQUESTED } from '../detail/detail.actions';
import * as _ from 'lodash';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
	public store = store;
	public navigationSubscription: Subscription;
	public DELETE_ORDER_REQUESTED = DELETE_ORDER_REQUESTED;

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				store.dispatch({ type: FETCH_ORDER_DETAIL_REQUESTED, data: this.getOrderId() });
			}
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (!_.isUndefined(this.navigationSubscription)) {
			this.navigationSubscription.unsubscribe();
		}
	}

	onSubmit() {
		let newOrder = (store as any).getState().Order.detail.data;
		store.dispatch({ type: UPDATE_ORDER_REQUESTED, data: newOrder });
	}

	getOrderId() {
		let orderId = this.activatedRoute.snapshot.paramMap.get('id');
		return orderId;
	}

	deleteOrder(orderId) {
		store.dispatch({ type: DELETE_ORDER_REQUESTED, data: orderId });
	}
}
