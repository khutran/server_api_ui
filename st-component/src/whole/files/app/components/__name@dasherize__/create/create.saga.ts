import { CREATE_<%= underscore(name).toUpperCase() %>_REQUESTED, CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* create<%= classify(name) %>(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.<%= camelize(name) %>.create(action.data).toPromise();
    yield put({ type: CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED, data: result });
    router.navigate(['<%= dasherize(name) %>']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreate<%= classify(name) %>Request() {
  yield takeEvery(CREATE_<%= underscore(name).toUpperCase() %>_REQUESTED, create<%= classify(name) %>);
}

export default [watchCreate<%= classify(name) %>Request];
