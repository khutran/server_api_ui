import * as _ from 'lodash';
import { Router } from '@angular/router';
import { FETCH_PROJECTS_REQUESTED } from './../list/list.actions';
import {
  DELETE_PROJECT_REQUESTED,
  GET_PROJECT_REQUESTED,
  GET_PROJECT_SUCCEEDED,
  EDIT_PROJECT_REQUESTED,
  RENDER_EDIT_PROJECT_FORM_REQUESTED,
  FILL_PROJECT_DETAIL_FORM,
  UPDATE_UPDATE_PROJECT_INPUT_OPTIONS,
  DELETE_BUILD_PROJECT_REQUESTED
} from './edit.actions';
import { takeEvery, put, takeLatest, call, all } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { fetchAllServer } from '../../server/server.saga';
import { fetchAllFramework } from '../../framework/framework.saga';
import { fetchAllStatus } from '../../status/status.saga';
import { fetchAllCategory } from '../../category/category.saga';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.project.update(action.data).toPromise();
    router.navigate(['projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditProjectRequest() {
  yield takeEvery(EDIT_PROJECT_REQUESTED, edit);
}

export function* fetchProjectDetail(id) {
  return yield AppInjector.get(ApiService)
    .project.getItemById(id)
    .toPromise();
}

function* getProject(action) {
  const [project, servers, frameworks, status, categories] = yield all([
    call(fetchProjectDetail, action.data),
    call(fetchAllServer),
    call(fetchAllFramework),
    call(fetchAllStatus),
    call(fetchAllCategory)
  ]);
  yield put({ type: GET_PROJECT_SUCCEEDED, data: project });
  const availablePackageManager = [{ id: 1, value: 'Composer', label: 'Composer' }, { id: 2, value: 'Yarn', label: 'Yarn' }];
  const availableSqlManager = [{ id: 1, value: 'MySQL', label: 'MySQL' }, { id: 2, value: 'Postgres', label: 'Postgres' }, { id: 3, value: 'MongoDB', label: 'MongoDB' }];
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'server', data: _.map(servers, item => _.assign(item, { value: item.name, label: item.name })) });
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'framework', data: _.map(frameworks, item => _.assign(item, { value: item.name, label: item.name })) });
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'status', data: _.map(status, item => _.assign(item, { value: item.name, label: item.name })) });
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'category', data: _.map(categories, item => _.assign(item, { value: item.name, label: item.name })) });
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'sql_manager', data: availableSqlManager });
  yield put({ type: UPDATE_UPDATE_PROJECT_INPUT_OPTIONS, input: 'package_manager', data: availablePackageManager });
  const data = {
    name: project.name,
    server: _.find(servers, item => item.id === project.host_id),
    framework: _.find(frameworks, item => item.id === project.framework_id),
    status: _.find(status, item => item.id === project.status_id),
    category: _.find(categories, item => item.id === project.category_id),
    package_manager: _.head(availablePackageManager),
    database: project.database,
    sql_manager: _.find(availableSqlManager, item => item.id === project.csdl_id),
    git_remote: project.git_remote,
    git_branch: project.git_branch,
    git_application_key: project.git_application_key,
    git_application_secret: project.git_application_secret
  };
  yield put({ type: FILL_PROJECT_DETAIL_FORM, data: data });
}

function* watchGetProjectRequest() {
  yield takeEvery(GET_PROJECT_REQUESTED, getProject);
}

function* checkProjectAlready(id) {
  return yield AppInjector.get(ApiService)
    .project.checkProjectAlready(id)
    .toPromise();
}

function* getDomainProject(name) {
  return yield AppInjector.get(ApiService)
    .project.getDomainProject(name)
    .toPromise();
}

function* getEnvById(id) {
  return AppInjector.get(ApiService)
    .env.getEnvById(id)
    .toPromise();
}

function* deleteDbProject(id) {
  return AppInjector.get(ApiService)
    .project.deleteDbProject(id)
    .toPromise();
}

function* deleteCodeProject(id) {
  return AppInjector.get(ApiService)
    .project.deleteCodeProject(id)
    .toPromise();
}

function* deleteDomainProject(name) {
  return AppInjector.get(ApiService)
    .project.deleteDomainProject(name)
    .toPromise();
}

function* deleteP(id) {
  return AppInjector.get(ApiService)
    .project.delete(id)
    .toPromise();
}
function* deleteProject(action) {
  try {
    const [isBuilded, domainData] = yield all([call(checkProjectAlready, action.data.id), call(getDomainProject, action.data.name)]);
    if (isBuilded.data.success) {
      const envData = yield call(getEnvById, action.data.id);
      if (!_.isEmpty(envData)) {
        yield call(deleteDbProject, action.data.id);
      }
      yield call(deleteCodeProject, action.data.id);
    }
    if (!_.isEmpty(domainData.data)) {
      yield call(deleteDomainProject, action.data.name);
    }
    yield call(deleteP, action.data.id);
    AppInjector.get(Router).navigate(['/projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* deleteBuildOfItem(action) {
  try {
    const isBuilded = yield call(checkProjectAlready, action.data);
    if (isBuilded.data.success) {
      const envData = yield call(getEnvById, action.data);
      if (!_.isEmpty(envData)) {
        yield call(deleteDbProject, action.data);
      }
      yield call(deleteCodeProject, action.data);
    }
    AppInjector.get(Router).navigate(['/projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteBuildRequested() {
  yield takeLatest(DELETE_BUILD_PROJECT_REQUESTED, deleteBuildOfItem);
}

function* watchDeleteProjectRequest() {
  yield takeEvery(DELETE_PROJECT_REQUESTED, deleteProject);
}

function* watchRenderProjectDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_PROJECT_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_PROJECT_REQUESTED, data: action.data.project_id });
  });
}

export default [watchEditProjectRequest, watchGetProjectRequest, watchDeleteProjectRequest, watchRenderProjectDetailFormRequested, watchDeleteBuildRequested];
