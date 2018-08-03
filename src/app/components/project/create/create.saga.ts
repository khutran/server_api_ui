import { CREATE_PROJECT_REQUESTED, CREATE_PROJECT_SUCCEEDED, UPDATE_CREATE_PROJECT_INPUT_OPTIONS, RENDER_CREATE_PROJECT_FORM_REQUESTED, CREATE_DOMAIN_REQUESTED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery, actionChannel, call, all } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';
import { fetchAllServer } from '../../server/server.saga';
import { fetchAllFramework } from '../../framework/framework.saga';
import { fetchAllStatus } from '../../status/status.saga';
import { fetchAllCategory } from '../../category/category.saga';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { GET_SERVER_REQUESTED } from '../../server/edit/edit.actions';

function* fetchAllData(action) {
  const [servers, frameworks, status, categories] = yield all([call(fetchAllServer), call(fetchAllFramework), call(fetchAllStatus), call(fetchAllCategory)]);
  const availablePackageManager = [{ id: 1, value: 'Composer', label: 'Composer', selected: true }, { id: 2, value: 'Yarn', label: 'Yarn' }];
  const availableSqlManager = [
    { id: 1, value: 'MySQL', label: 'MySQL', selected: true },
    { id: 2, value: 'Postgres', label: 'Postgres' },
    { id: 3, value: 'MongoDB', label: 'MongoDB' }
  ];
  yield put({
    type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS,
    input: 'server',
    data: _.map(servers, (item, key) => _.assign(item, { value: item.name, label: item.name, selected: key === 0 }))
  });
  yield put({
    type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS,
    input: 'framework',
    data: _.map(frameworks, (item, key) => _.assign(item, { value: item.name, label: item.name, selected: key === 0 }))
  });
  yield put({
    type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS,
    input: 'status',
    data: _.map(status, (item, key) => _.assign(item, { value: item.name, label: item.name, selected: key === 0 }))
  });
  yield put({
    type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS,
    input: 'category',
    data: _.map(categories, (item, key) => _.assign(item, { value: item.name, label: item.name, selected: key === 0 }))
  });
  yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'sql_manager', data: availableSqlManager });
  yield put({ type: UPDATE_CREATE_PROJECT_INPUT_OPTIONS, input: 'package_manager', data: availablePackageManager });
}

function* watchCreateProjectFormRequested() {
  yield takeEvery(RENDER_CREATE_PROJECT_FORM_REQUESTED, fetchAllData);
}

function* createProject(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let serverData = yield api.server.getItemById(action.data.server_id).toPromise();
    let data = {
      name: action.data.name,
      ip: serverData.ip
    };
    console.log('data', data);
    let domainData = yield api.project.domainPointingIP(data).toPromise();
    let result = yield api.project.create(action.data).toPromise();
    yield put({ type: CREATE_PROJECT_SUCCEEDED, data: result, domain: domainData });
    AppInjector.get(NotificationService).show('success', 'Create success', 5000);
    router.navigate(['projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(CREATE_PROJECT_REQUESTED, createProject);
}

export default [watchCreateProjectFormRequested, watchCreateProjectRequest];
