import { Router } from '@angular/router';
import { FETCH_CURRENCYS_REQUESTED } from './../list/list.actions';
import { DELETE_CURRENCY_REQUESTED, GET_CURRENCY_REQUESTED, GET_CURRENCY_SUCCEEDED, EDIT_CURRENCY_REQUESTED } from './edit.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* editCurrency(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.currency.update(action.data).toPromise();
    router.navigate(['currency']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditCurrencyRequest() {
  yield takeEvery(EDIT_CURRENCY_REQUESTED, editCurrency);
}

function* getCurrency(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.currency.getItemById(action.data).toPromise();
    yield put({ type: GET_CURRENCY_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetCurrencyRequest() {
  yield takeEvery(GET_CURRENCY_REQUESTED, getCurrency);
}

function* deleteCurrency(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.currency.delete(action.data).toPromise();
    yield put({ type: FETCH_CURRENCYS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteCurrencyRequest() {
  yield takeEvery(DELETE_CURRENCY_REQUESTED, deleteCurrency);
}

export default [watchEditCurrencyRequest, watchGetCurrencyRequest, watchDeleteCurrencyRequest];
