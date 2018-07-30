import { CREATE_PROJECT_REQUESTED, CREATE_PROJECT_SUCCEEDED, UPDATE_CREATE_PROJECT_INPUT_OPTIONS } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery, actionChannel } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';
import { GET_ALL_CATEGORIES_SUCCEEDED } from '../../category/category.action';
import * as _ from 'lodash';
import { GET_ALL_FRAMEWORKS_SUCCEEDED } from '../../framework/framework.action';
import { GET_ALL_STATUSS_SUCCEEDED } from '../../status/status.action';
import { GET_ALL_SERVERS_SUCCEEDED } from '../../server/server.action';

function* createProject(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.project.create(action.data).toPromise();
    yield put({ type: CREATE_PROJECT_SUCCEEDED, data: result });
    router.navigate(['projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(CREATE_PROJECT_REQUESTED, createProject);
}

function* updateCategoryDropdown(action) {
  if (action.component === 'CREATE_PROJECT_COMPONENT') {
    const data = _.map(action.data, item => _.assign(item, { value: item.name, label: item.name }));
    if (!_.isUndefined(_.head(data))) {
      data[0].selected = true;
    }
    yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'category', data: data });
  }
}

function* watchAllCategoryFetched() {
  yield takeEvery(GET_ALL_CATEGORIES_SUCCEEDED, updateCategoryDropdown);
}

function* updateFrameworkDropdown(action) {
  if (action.component === 'CREATE_PROJECT_COMPONENT') {
    const data = _.map(action.data, item => _.assign(item, { value: item.name, label: item.name }));
    if (!_.isUndefined(_.head(data))) {
      data[0].selected = true;
    }
    yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'framework', data: data });
  }
}

function* watchAllFrameworkFetched() {
  yield takeEvery(GET_ALL_FRAMEWORKS_SUCCEEDED, updateFrameworkDropdown);
}

function* updateStatusDropdown(action) {
  if (action.component === 'CREATE_PROJECT_COMPONENT') {
    const data = _.map(action.data, item => _.assign(item, { value: item.name, label: item.name }));
    if (!_.isUndefined(_.head(data))) {
      data[0].selected = true;
    }
    yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'status', data: data });
  }
}

function* watchAllStatusFetched() {
  yield takeEvery(GET_ALL_STATUSS_SUCCEEDED, updateStatusDropdown);
}

function* updateServerDropdown(action) {
  if (action.component === 'CREATE_PROJECT_COMPONENT') {
    const data = _.map(action.data, item => _.assign(item, { value: item.name, label: item.name }));
    if (!_.isUndefined(_.head(data))) {
      data[0].selected = true;
    }
    yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'server', data: data });
  }
}

function* watchAllServerFetched() {
  yield takeEvery(GET_ALL_SERVERS_SUCCEEDED, updateServerDropdown);
}

export default [watchCreateProjectRequest, watchAllCategoryFetched, watchAllFrameworkFetched, watchAllStatusFetched, watchAllServerFetched];
