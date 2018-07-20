import { NotificationService } from './../../../common/services/notification/notification.service';
import { Router } from '@angular/router';
import { PreloaderService } from './../../../common/services/preloader/preloader.service';
import { takeEvery } from 'redux-saga/effects';
import {
	CREATE_CUSTOMER_ADDRESS_REQUESTED,
	FETCH_CUSTOMER_DETAIL_REQUESTED,
	FETCH_CUSTOMER_DETAIL_SUCCEEDED,
	FETCH_CUSTOMER_ADDRESSES_REQUESTED,
	FETCH_CUSTOMER_ADDRESSES_SUCCEEDED,
	DELETE_CUSTOMER_ADDRESS_REQUESTED,
	DELETE_CUSTOMER_ADDRESS_SUCCEEDED,
	UPDATE_CUSTOMER_ADDRESS_SUCCEEDED,
	UPDATE_CUSTOMER_ADDRESS_REQUESTED,
	UPDATE_CUSTOMER_REQUESTED,
	UPDATE_CUSTOMER_SUCCEEDED,
	CREATE_CUSTOMER_ADDRESS_SUCCEEDED,
	SET_DEFAULT_ADDRESS_REQUESTED,
	SET_DEFAULT_ADDRESS_SUCCEEDED,
	DELETE_CUSTOMER_SUCCEEDED,
	DELETE_CUSTOMER_REQUESTED
} from './edit.actions';
import { put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import addressesSaga from './addresses/addresses.saga';

function* createCustomerAddress(action) {
	const api = AppInjector.get(ApiService);
	try {
		AppInjector.get(PreloaderService).show();
		let result = yield api.customerAddress.create(action.data).toPromise();
		yield put({ type: CREATE_CUSTOMER_ADDRESS_SUCCEEDED, data: result });
		AppInjector.get(Router).navigate([`/customer/edit/${action.data.user_id}/addresses`]);
		AppInjector.get(PreloaderService).hide();
	} catch (e) {
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchCreateCustomerAddressRequest() {
	yield takeEvery(CREATE_CUSTOMER_ADDRESS_REQUESTED, createCustomerAddress);
}

function* getCustomer(action) {
	const api = AppInjector.get(ApiService);
	try {
		let result = yield api.user.getItemById(action.data).toPromise();
		yield put({ type: FETCH_CUSTOMER_DETAIL_SUCCEEDED, data: result });
	} catch (e) {
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchFetchCustomerDetailRequest() {
	yield takeEvery(FETCH_CUSTOMER_DETAIL_REQUESTED, getCustomer);
}

function* getCustomerAddresses(action) {
	const api = AppInjector.get(ApiService);
	try {
		let results = yield api.customerAddress.get(action.data.pagination, null, action.data.filter).toPromise();
		// console.log(results);
		yield put({
			type: FETCH_CUSTOMER_ADDRESSES_SUCCEEDED,
			data: results.items
		});
	} catch (e) {
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchFetchCustomerAddressesRequest() {
	yield takeEvery(FETCH_CUSTOMER_ADDRESSES_REQUESTED, getCustomerAddresses);
}

function* deleteAddress(action) {
	const api = AppInjector.get(ApiService);
	try {
		AppInjector.get(PreloaderService).show();
		let result = yield api.customerAddress.delete(action.data.id).toPromise();
		yield put({ type: DELETE_CUSTOMER_ADDRESS_SUCCEEDED, data: action.data });
		AppInjector.get(PreloaderService).hide();
		AppInjector.get(NotificationService).show('success', 'Address deleted', 3000);
		AppInjector.get(Router).navigate([`/customer/edit/${action.data.user_id}/addresses`]);
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchDeleteCustomerAddressRequest() {
	yield takeEvery(DELETE_CUSTOMER_ADDRESS_REQUESTED, deleteAddress);
}

function* updateAddress(action) {
	const api = AppInjector.get(ApiService);
	try {
		let result = yield api.customerAddress.update(action.data).toPromise();
		yield put({ type: UPDATE_CUSTOMER_ADDRESS_SUCCEEDED, data: result });
		AppInjector.get(Router).navigate([`customer/edit/${action.userId}/addresses`]);
	} catch (e) {
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchUpdateCustomerAddressRequest() {
	yield takeEvery(UPDATE_CUSTOMER_ADDRESS_REQUESTED, updateAddress);
}

function* updateCustomer(action) {
	const api = AppInjector.get(ApiService);
	try {
		AppInjector.get(PreloaderService).show();
		let result = yield api.user.update(action.data).toPromise();
		yield put({ type: UPDATE_CUSTOMER_SUCCEEDED, data: result });
		AppInjector.get(PreloaderService).hide();
		AppInjector.get(NotificationService).show('success', 'Customer updated', 3000);
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchUpdateCustomerRequest() {
	yield takeEvery(UPDATE_CUSTOMER_REQUESTED, updateCustomer);
}

function* deleteCustomer(action) {
	try {
		AppInjector.get(PreloaderService).show();
		const result = yield AppInjector.get(ApiService)
			.user.delete(action.data)
			.toPromise();
		if (!_.isUndefined(action.com)) {
			yield put({
				type: DELETE_CUSTOMER_SUCCEEDED,
				com: action.com,
				data: result
			});
			AppInjector.get(NotificationService).show('success', 'Customer Deleted', 3000);
			AppInjector.get(Router).navigate(['/customer']);
		}
		AppInjector.get(PreloaderService).hide();
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchDeteleCustomerRequest() {
	yield takeEvery(DELETE_CUSTOMER_REQUESTED, deleteCustomer);
}

export default [
	...addressesSaga,
	watchCreateCustomerAddressRequest,
	watchFetchCustomerDetailRequest,
	watchFetchCustomerAddressesRequest,
	watchDeleteCustomerAddressRequest,
	watchUpdateCustomerAddressRequest,
	watchUpdateCustomerRequest,
	watchDeteleCustomerRequest
];
