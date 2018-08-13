import * as _ from 'lodash';
import { Router } from '@angular/router';
import { SEND_COMMAND_SUCCESSED, SEND_COMMAND_REQUESTED } from './command.actions';
import { takeEvery, put, takeLatest, call, all } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* runCommand(id, command) {
  return yield AppInjector.get(ApiService)
    .project.runCommand(id, command)
    .toPromise();
}

function* sendCommand(action) {
  try {
    const cmd = yield call(runCommand, action.data.id, action.data.command);
    console.log(cmd);
    yield put({ type: SEND_COMMAND_SUCCESSED, data: cmd.data });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchPutCommandRequested() {
  yield takeLatest(SEND_COMMAND_REQUESTED, sendCommand);
}

export default [watchPutCommandRequested];
