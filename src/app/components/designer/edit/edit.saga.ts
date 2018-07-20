import { FETCH_DESIGNERS_REQUESTED } from './../list/list.actions';
import { Router } from '@angular/router';
import { DELETE_DESIGNER_REQUESTED, GET_DESIGNER_REQUESTED, GET_DESIGNER_SUCCEEDED, EDIT_DESIGNER_REQUESTED } from './edit.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* editDesigner(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.designer.update(action.data).toPromise();
    router.navigate(['designer']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditDesignerRequest() {
  yield takeEvery(EDIT_DESIGNER_REQUESTED, editDesigner);
}

function* getDesigner(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.designer.getItemById(action.data).toPromise();
    yield put({ type: GET_DESIGNER_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetDesignerRequest() {
  yield takeEvery(GET_DESIGNER_REQUESTED, getDesigner);
}

function* deleteDesigner(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.designer.delete(action.data).toPromise();
    // console.log('ok');
    yield put({ type: FETCH_DESIGNERS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteDesignerRequest() {
  yield takeEvery(DELETE_DESIGNER_REQUESTED, deleteDesigner);
}

export default [
  watchEditDesignerRequest,
  watchGetDesignerRequest,
  watchDeleteDesignerRequest,
];
