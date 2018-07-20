import { PreloaderService } from './../../common/services/preloader/preloader.service';
import { API_CALL_ERROR } from './../../store/action';
import { ApiService } from './../../api/api.service';
import { AppInjector } from './../../app-injector';
import { fork, takeEvery, put } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import createSaga from './create/create.saga';
import editSaga from './edit/edit.saga';
import { FETCH_ALL_CUSTOMER_GROUP_REQUESTED, FETCH_ALL_CUSTOMER_GROUP_SUCCEEDED } from './customer.actions';

function* fetchAllCustomerGroup(action) {
	try {
		AppInjector.get(PreloaderService).show();
		const results = yield AppInjector.get(ApiService)
			.customerGroup.get()
			.toPromise();
		yield put({ type: FETCH_ALL_CUSTOMER_GROUP_SUCCEEDED, data: results });
		AppInjector.get(PreloaderService).hide();
	} catch (e) {
		AppInjector.get(PreloaderService).hide();
		yield put({ type: API_CALL_ERROR, error: e });
	}
}

function* watchFetchAllCustomerGroupRequest() {
	yield takeEvery(FETCH_ALL_CUSTOMER_GROUP_REQUESTED, fetchAllCustomerGroup);
}

export default _.map([...listSaga, ...createSaga, ...editSaga, watchFetchAllCustomerGroupRequest], item => fork(item));
