import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import listUserSaga from './list/list.saga';
import createUser from './create/create.saga';
import editUser from './edit/edit.saga';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';
import { GET_ALL_USERS_NO_PAGINATION_REQUESTED, GET_ALL_USERS_NO_PAGINATION_SUCCEEDED, ASSIGN_PROJECT_TO_USER_REQUESTED, ASSIGN_PROJECT_TO_USER_SUCCEEDED } from './user.actions';
import { API_CALL_ERROR } from '../../store/action';
import { PROJECT_COMP } from '../project/project.const';
import { NotificationService } from '../../common/services/notification/notification.service';
import { Router } from '@angular/router';

function* allSaga(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.user.list().toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case PROJECT_COMP:
          let listUserAssignedByProject = yield api.project.getUsersById(action.data.id_project).toPromise();
          yield put({
            type: GET_ALL_USERS_NO_PAGINATION_SUCCEEDED,
            data: results,
            userIsAssigned: listUserAssignedByProject.users,
            com: action.com
          });
      }
    } else {
      yield put({ type: GET_ALL_USERS_NO_PAGINATION_SUCCEEDED, data: results });
    }
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchAllUsersNoPaginationRequest() {
  yield takeLatest(GET_ALL_USERS_NO_PAGINATION_REQUESTED, allSaga);
}

function* assignProjectUser(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.user.assignProjectToUser(action.userId,action.data).toPromise();
    yield put({
      type: ASSIGN_PROJECT_TO_USER_SUCCEEDED,
      data: results
    });
    AppInjector.get(NotificationService).show('success', 'Assign success', 5000);
    AppInjector.get(Router).navigate(['projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchAssignProjectUserRequest() {
  yield takeLatest(ASSIGN_PROJECT_TO_USER_REQUESTED, assignProjectUser);
}
export default _.map([...listUserSaga, ...createUser, ...editUser, watchFetchAllUsersNoPaginationRequest, watchAssignProjectUserRequest], item => fork(item));
