import { CREATE_DESIGNER_SUCCEEDED, CREATE_DESIGNER_REQUESTED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createDesigner(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.designer.create(action.data).toPromise();
    // console.log(result);
    yield put({ type: CREATE_DESIGNER_SUCCEEDED, data: result });
    router.navigate(['designer']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateSizeRequest() {
  yield takeEvery(CREATE_DESIGNER_REQUESTED, createDesigner);
}

export default [
  watchCreateSizeRequest,
];
