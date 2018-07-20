import { SET_DEFAULT_ADDRESS_SUCCEEDED } from './../edit.actions';
import { NotificationService } from './../../../../common/services/notification/notification.service';
import { API_CALL_ERROR } from './../../../../store/action';
import { ApiService } from './../../../../api/api.service';
import { AppInjector } from './../../../../app-injector';
import { SET_DEFAULT_BILLING_ADDRESS_REQUESTED, SET_DEFAULT_BILLING_ADDRESS_SUCCEEDED } from './addresses.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';
import { Router } from '@angular/router';
import { SET_DEFAULT_ADDRESS_REQUESTED } from '../edit.actions';

function* setDefaultBilling(action) {
	try {
		AppInjector.get(PreloaderService).show();
		const result = yield AppInjector.get(ApiService)
			.customerAddress.setDefaultAddress(action.data)
			.toPromise();

		yield put({ type: SET_DEFAULT_BILLING_ADDRESS_SUCCEEDED, data: result });
		AppInjector.get(PreloaderService).hide();
		AppInjector.get(NotificationService).show('success', 'Set default billing address successfully', 3000);
		AppInjector.get(Router).navigate([`/customer/edit/${action.data.user_id}/addresses`]);
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchSetDefaultBillingRequest() {
	yield takeEvery(SET_DEFAULT_BILLING_ADDRESS_REQUESTED, setDefaultBilling);
}

function* setDefaultAddress(action) {
	try {
		AppInjector.get(PreloaderService).show();
		const result = yield AppInjector.get(ApiService)
			.customerAddress.setDefaultAddress(action.data)
			.toPromise();
		yield put({ type: SET_DEFAULT_ADDRESS_SUCCEEDED, data: result });
		AppInjector.get(PreloaderService).hide();
		AppInjector.get(NotificationService).show('success', 'Set default address successfully', 3000);
		AppInjector.get(Router).navigate([`/customer/edit/${action.data.user_id}/addresses`]);
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchSetDefaultAddress() {
	yield takeEvery(SET_DEFAULT_ADDRESS_REQUESTED, setDefaultAddress);
}

export default [watchSetDefaultBillingRequest, watchSetDefaultAddress];
