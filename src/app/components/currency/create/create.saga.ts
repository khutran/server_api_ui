import { CREATE_CURRENCY_REQUESTED, CREATE_CURRENCY_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createCurrency(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.currency.create(action.data).toPromise();
    yield put({ type: CREATE_CURRENCY_SUCCEEDED, data: result });
    router.navigate(['currency']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateCurrencyRequest() {
  yield takeEvery(CREATE_CURRENCY_REQUESTED, createCurrency);
}

export default [watchCreateCurrencyRequest];
