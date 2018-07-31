import { CREATE_CATEGORY_REQUESTED, CREATE_CATEGORY_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createCategory(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.category.create(action.data).toPromise();
    yield put({ type: CREATE_CATEGORY_SUCCEEDED, data: result });
    router.navigate(['categories']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateCategoryRequest() {
  yield takeEvery(CREATE_CATEGORY_REQUESTED, createCategory);
}

export default [watchCreateCategoryRequest];
